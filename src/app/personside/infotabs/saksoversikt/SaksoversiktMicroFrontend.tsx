import * as React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import DokumentListeContainer from './saksdokumenter/SaksDokumenterContainer';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import { parseQueryParams } from '../../../../utils/url-utils';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import {
    setErStandaloneVindu,
    settValgtDokument,
    settValgtEnkeltdokument,
    settValgtSakstema,
    settVisDokument
} from '../../../../redux/saksoversikt/actions';
import { sakstemakodeAlle } from './sakstemaliste/SakstemaListe';
import { aggregertSakstema } from './utils/saksoversiktUtils';
import LyttPåNyttFnrIReduxOgHentPersoninfo from '../../../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentPersoninfo';
import FetchFeatureToggles from '../../../PersonOppslagHandler/FetchFeatureToggles';
import SetFnrIRedux from '../../../PersonOppslagHandler/SetFnrIRedux';
import { BigCenteredLazySpinner } from '../../../../components/BigCenteredLazySpinner';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { useOnMount } from '../../../../utils/customHooks';
import { hasData } from '../../../../rest/utils/restResource';

interface Props {
    fødselsnummer: string;
    queryParamString?: string;
}

const SaksoversiktArticle = styled.article`
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    > *:last-child {
        width: 70%;
        margin-left: ${theme.margin.layout};
    }
    > *:not(:last-child) {
        overflow-y: scroll;
    }
    > * {
        height: 100%;
    }
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

function hentUtSakstema(sakstemaListe: Sakstema[], sakstemaKode: string, journalpostId: string): Sakstema | undefined {
    if (sakstemaKode === sakstemakodeAlle) {
        return aggregertSakstema(sakstemaListe);
    }

    return sakstemaListe.find(
        sakstema =>
            sakstema.temakode === sakstemaKode &&
            sakstema.dokumentMetadata.find(metadata => metadata.journalpostId === journalpostId) !== undefined
    );
}

function hentUtDokumentMetadata(sakstema: Sakstema, journalpostId: string): DokumentMetadata | undefined {
    return sakstema.dokumentMetadata.find(metadata => metadata.journalpostId === journalpostId);
}

function hentUtValgtDokument(dokumentMetadata: DokumentMetadata, dokumentId: string): Dokument | undefined {
    if (dokumentMetadata.hoveddokument.dokumentreferanse === dokumentId) {
        return dokumentMetadata.hoveddokument;
    }
    return dokumentMetadata.vedlegg.find(vedlegg => vedlegg.dokumentreferanse === dokumentId);
}

function hentQueryParametreFraUrlOgVisDokument(
    sakstemaListe: Sakstema[],
    dispatch: AsyncDispatch,
    queryParamString: string
) {
    const queryParams = parseQueryParams(queryParamString);
    const sakstemaKode = queryParams.sakstemaKode;
    const journalId = queryParams.journalpostId;
    const dokumentId = queryParams.dokumentId;

    if (!(sakstemaKode && journalId && dokumentId)) {
        return;
    }

    const sakstema = hentUtSakstema(sakstemaListe, sakstemaKode, journalId);
    if (!sakstema) {
        return;
    }

    const dokumentMetadata = hentUtDokumentMetadata(sakstema, journalId);
    if (!dokumentMetadata) {
        return;
    }

    const dokument = hentUtValgtDokument(dokumentMetadata, dokumentId);
    if (!dokument) {
        return;
    }

    dispatch(settValgtSakstema(sakstema));
    dispatch(settValgtDokument(dokumentMetadata));
    dispatch(settValgtEnkeltdokument(dokument));
    dispatch(settVisDokument(true));
}

function SaksoversiktMicroFrontend(props: Props) {
    const saksoversiktResource = useSelector((state: AppState) => state.restResources.sakstema);
    const dispatch = useDispatch();
    useOnMount(() => {
        dispatch(setErStandaloneVindu(true));
    });
    useEffect(() => {
        if (hasData(saksoversiktResource) && props.queryParamString) {
            hentQueryParametreFraUrlOgVisDokument(saksoversiktResource.data.resultat, dispatch, props.queryParamString);
        }
    }, [saksoversiktResource, props.queryParamString, dispatch]);

    return (
        <SaksoversiktArticle>
            <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
            <LyttPåNyttFnrIReduxOgHentPersoninfo />
            <FetchFeatureToggles />
            <RestResourceConsumer<SakstemaResponse>
                getResource={restResources => restResources.sakstema}
                returnOnPending={BigCenteredLazySpinner}
            >
                {sakstema => (
                    <>
                        <DokumentListeContainer />
                        <DokumentOgVedlegg />
                    </>
                )}
            </RestResourceConsumer>
        </SaksoversiktArticle>
    );
}

export default SaksoversiktMicroFrontend;
