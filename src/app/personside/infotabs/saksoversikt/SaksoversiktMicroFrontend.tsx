import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import DokumentListeContainer from './saksdokumenter/SaksDokumenterContainer';
import { Sakstema } from '../../../../models/saksoversikt/sakstema';
import { useDispatch } from 'react-redux';
import DokumentOgVedlegg from './dokumentvisning/DokumentOgVedlegg';
import { parseQueryParams } from '../../../../utils/url-utils';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import {
    setErStandaloneVindu,
    settValgtDokument,
    settValgtEnkeltdokument,
    huskValgtSakstema,
    settVisDokument
} from '../../../../redux/saksoversikt/actions';
import { sakstemakodeAlle } from './sakstemaliste/SakstemaListe';
import { aggregertSakstema, useAgregerteSaker } from './utils/saksoversiktUtils';
import LyttPåNyttFnrIReduxOgHentPersoninfo from '../../../PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentPersoninfo';
import FetchFeatureToggles from '../../../PersonOppslagHandler/FetchFeatureToggles';
import SetFnrIRedux from '../../../PersonOppslagHandler/SetFnrIRedux';
import { useAppState, useFødselsnummer, useOnMount, useRestResource } from '../../../../utils/customHooks';
import { hasData, isNotStarted } from '../../../../rest/utils/restResource';
import LazySpinner from '../../../../components/LazySpinner';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import FillCenterAndFadeIn from '../../../../components/FillCenterAndFadeIn';
import { loggEvent } from '../../../../utils/frontendLogger';

interface Props {
    fødselsnummer: string;
}

const SaksoversiktArticle = styled.article`
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    > *:last-child {
        flex-basis: 70%;
        flex-shrink: 0;
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

function useVelgSakFraQueryParametre() {
    const saksoversiktResource = useRestResource(resources => resources.sakstema);
    const dispatch = useDispatch();
    const queryParamsString = useLocation().search;

    useEffect(() => {
        if (!hasData(saksoversiktResource)) {
            return;
        }
        const sakstemaListe = saksoversiktResource.data.resultat;
        const queryParams = parseQueryParams(queryParamsString);
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

        dispatch(huskValgtSakstema(sakstema));
        dispatch(settValgtDokument(dokumentMetadata));
        dispatch(settValgtEnkeltdokument(dokument));
        dispatch(settVisDokument(true));
    }, [dispatch, queryParamsString, saksoversiktResource]);
}

function SaksoversiktMicroFrontend() {
    const valgtSakstema = useAppState(state => state.saksoversikt.forrigeValgteSakstema);
    const aggregerteSaker = useAgregerteSaker();

    useVelgSakFraQueryParametre();

    if (!aggregerteSaker) {
        return (
            <FillCenterAndFadeIn>
                <LazySpinner />
            </FillCenterAndFadeIn>
        );
    }

    return (
        <SaksoversiktArticle>
            <DokumentListeContainer valgtSakstema={valgtSakstema || aggregerteSaker} />
            <DokumentOgVedlegg />
        </SaksoversiktArticle>
    );
}

function SaksoversiktMicroFrontendContainer(props: Props) {
    const dispatch = useDispatch();
    const fnr = useFødselsnummer();
    const saksoversiktResource = useRestResource(resources => resources.sakstema);

    useOnMount(() => {
        dispatch(setErStandaloneVindu(true));
        loggEvent('Sidevisning', 'SaksoversiktEgetVindu');
    });

    useEffect(() => {
        if (isNotStarted(saksoversiktResource) && fnr) {
            dispatch(saksoversiktResource.actions.fetch);
        }
    }, [fnr, dispatch, saksoversiktResource]);

    return (
        <>
            <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
            <LyttPåNyttFnrIReduxOgHentPersoninfo />
            <FetchFeatureToggles />
            <SaksoversiktMicroFrontend />
        </>
    );
}

export default SaksoversiktMicroFrontendContainer;
