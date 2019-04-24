import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import DokumentListeContainer from './saksdokumenter/SaksDokumenterContainer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { isLoaded, isNotStarted, DeprecatedRestResource } from '../../../../redux/restReducers/deprecatedRestResource';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import { PersonRespons } from '../../../../models/person/person';
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

interface OwnProps {
    fødselsnummer: string;
    queryParamString?: string;
}

interface StateProps {
    saksoversiktResource: DeprecatedRestResource<SakstemaResponse>;
    personResource: DeprecatedRestResource<PersonRespons>;
}

interface DispatchProps {
    hentSaksoversikt: (fødselsnummer: string) => void;
    setErMicroFrontend: () => void;
    velgOgVisDokument: (sakstema: Sakstema, dokument: DokumentMetadata, enkeltdokument: Dokument) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

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

function hentQueryParametreFraUrlOgVisDokument(props: Props) {
    if (props.queryParamString && isLoaded(props.saksoversiktResource)) {
        const queryParams = parseQueryParams(props.queryParamString);
        const sakstemaKode = queryParams.sakstemaKode;
        const journalId = queryParams.journalpostId;
        const dokumentId = queryParams.dokumentId;

        if (!(sakstemaKode && journalId && dokumentId)) {
            return;
        }

        const sakstemaListe = props.saksoversiktResource.data.resultat;
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

        props.velgOgVisDokument(sakstema, dokumentMetadata, dokument);
    }
}

class SaksoversiktMicroFrontend extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.setErMicroFrontend();
        if (isNotStarted(this.props.saksoversiktResource)) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
    }

    componentDidUpdate(prevProps: Props) {
        const førsteUpdateEtterLasting =
            isLoaded(this.props.saksoversiktResource) && !isLoaded(prevProps.saksoversiktResource);

        if (førsteUpdateEtterLasting) {
            hentQueryParametreFraUrlOgVisDokument(this.props);
        }
    }

    render() {
        return (
            <SaksoversiktArticle>
                <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                <LyttPåNyttFnrIReduxOgHentPersoninfo />
                <FetchFeatureToggles />
                <Innholdslaster
                    avhengigheter={[this.props.saksoversiktResource]}
                    returnOnPending={BigCenteredLazySpinner}
                >
                    <DokumentListeContainer />
                    <DokumentOgVedlegg />
                </Innholdslaster>
            </SaksoversiktArticle>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        saksoversiktResource: state.restResources.sakstema,
        personResource: state.restResources.personinformasjon
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSaksoversikt: (fødselsnummer: string) => dispatch(hentSaksoversikt(fødselsnummer)),
        setErMicroFrontend: () => dispatch(setErStandaloneVindu(true)),
        velgOgVisDokument: (sakstema: Sakstema, dokument: DokumentMetadata, enkeltdokument: Dokument) => {
            dispatch(settValgtSakstema(sakstema));
            dispatch(settValgtDokument(dokument));
            dispatch(settVisDokument(true));
            dispatch(settValgtEnkeltdokument(enkeltdokument));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaksoversiktMicroFrontend);
