import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import SakstemaListeContainer from './sakstemaliste/SakstemaListeContainer';
import DokumentListeContainer from './saksdokumenter/SaksDokumenterContainer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { isLoaded, isNotStarted, RestReducer } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import { PersonRespons } from '../../../../models/person/person';
import { oppslagNyBruker } from '../../../../redux/restReducers/oppslagNyBruker';
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

interface OwnProps {
    fødselsnummer: string;
    queryParamString?: string;
}

interface StateProps {
    visDokument: boolean;
    saksoversiktReducer: RestReducer<SakstemaResponse>;
    personReducer: RestReducer<PersonRespons>;
}

interface DispatchProps {
    hentSaksoversikt: (fødselsnummer: string) => void;
    hentPerson: (fødselsnummer: string) => void;
    setErMicroFrontend: () => void;
    velgOgVisDokument: (sakstema: Sakstema, dokument: DokumentMetadata, enkeltdokument: Dokument) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const SaksoversiktArticle = styled.article<{ visDokument: boolean }>`
    display: flex;
    align-items: flex-start;
    width: 100vw;
    > *:last-child {
        width: 70%;
        ${props =>
            !props.visDokument &&
            css`
                display: none;
            `};
        margin-left: ${theme.margin.layout};
    }
    > *:first-child {
        ${props =>
            props.visDokument &&
            css`
                display: none;
            `};
        margin-right: ${theme.margin.layout};
    }
    > *:not(:last-child) {
        overflow-y: scroll;
    }
    > * {
        height: 100%;
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
    if (props.queryParamString && isLoaded(props.saksoversiktReducer)) {
        const queryParams = parseQueryParams(props.queryParamString);
        const sakstemaKode = queryParams.sakstemaKode;
        const journalId = queryParams.journalpostId;
        const dokumentId = queryParams.dokumentId;

        if (!(sakstemaKode && journalId && dokumentId)) {
            return;
        }

        const sakstemaListe = props.saksoversiktReducer.data.resultat;
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
        if (isNotStarted(this.props.saksoversiktReducer)) {
            this.props.hentSaksoversikt(this.props.fødselsnummer);
        }
        if (isNotStarted(this.props.personReducer)) {
            this.props.hentPerson(this.props.fødselsnummer);
        }
    }

    componentDidUpdate(prevProps: Props) {
        const førsteUpdateEtterLasting =
            isLoaded(this.props.saksoversiktReducer) && !isLoaded(prevProps.saksoversiktReducer);

        if (førsteUpdateEtterLasting) {
            hentQueryParametreFraUrlOgVisDokument(this.props);
        }
    }

    render() {
        return (
            <SaksoversiktArticle visDokument={this.props.visDokument}>
                <Innholdslaster avhengigheter={[this.props.saksoversiktReducer]}>
                    <SakstemaListeContainer />
                    <DokumentListeContainer />
                    <DokumentOgVedlegg />
                </Innholdslaster>
            </SaksoversiktArticle>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        visDokument: state.saksoversikt.visDokument,
        saksoversiktReducer: state.restEndepunkter.saksoversiktReducer,
        personReducer: state.restEndepunkter.personinformasjon
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSaksoversikt: (fødselsnummer: string) => dispatch(hentSaksoversikt(fødselsnummer)),
        hentPerson: fødselsnummer => oppslagNyBruker(dispatch, fødselsnummer),
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
