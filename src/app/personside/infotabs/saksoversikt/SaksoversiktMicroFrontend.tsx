import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import SakstemaListeContainer from './SakstemaListeContainer';
import DokumentListeContainer from './DokumentListeContainer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { isLoaded, isNotStarted, Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import { AppState } from '../../../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';
import { hentSaksoversikt } from '../../../../redux/restReducers/saksoversikt';
import { PersonRespons } from '../../../../models/person/person';
import { hentAllPersonData } from '../../../../redux/restReducers/personinformasjon';
import DokumentOgVedlegg from './DokumentOgVedlegg';
import { parseQueryParams } from '../../../../utils/url-utils';
import { Dokument, DokumentMetadata } from '../../../../models/saksoversikt/dokumentmetadata';
import {
    setErStandaloneVindu,
    settValgtDokument,
    settValgtEnkeltdokument,
    settValgtSakstema,
    settVisDokument
} from '../../../../redux/saksoversikt/actions';
import { sakstemakodeAlle } from './SakstemaListe';
import { aggregertSakstema } from './saksoversiktUtils';

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
    settAtStandaloneVinduErÅpnet: () => void;
    velgOgVis: (sakstema: Sakstema, dokument: DokumentMetadata, enkeltdokument: Dokument) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const SaksoversiktArticle = styled.article<{ visDokument: boolean }>`
    display: flex;
    align-items: flex-start;
    width: 100vw;
    > *:last-child {
      width: 70%;
      ${props => !props.visDokument && 'display: none'}
      margin-left: ${theme.margin.layout};
    }
    > *:first-child {
      ${props => props.visDokument && 'display: none'}
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

    return sakstemaListe.find(sakstema =>
        sakstema.temakode === sakstemaKode &&
        (sakstema.dokumentMetadata.find(metadata => metadata.journalpostId === journalpostId) !== undefined));
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

class SaksoversiktMicroFrontend extends React.PureComponent<Props> {

    componentDidMount() {
        this.props.settAtStandaloneVinduErÅpnet();
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
        if (førsteUpdateEtterLasting && this.props.queryParamString) {
            const queryParams = parseQueryParams(this.props.queryParamString);
            const sakstemaKode = queryParams.sakstemaKode;
            const journalId = queryParams.journalpostId;
            const dokumentId = queryParams.dokumentId;

            if (!(sakstemaKode && journalId && dokumentId)) {
                return;
            }

            const sakstemaListe = (this.props.saksoversiktReducer as Loaded<SakstemaResponse>).data.resultat;
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

            this.props.velgOgVis(sakstema, dokumentMetadata, dokument);
        }
    }

    render() {
        return (
            <SaksoversiktArticle visDokument={this.props.visDokument}>
                <Innholdslaster avhengigheter={[this.props.saksoversiktReducer]}>
                    <SakstemaListeContainer/>
                    <DokumentListeContainer/>
                    <DokumentOgVedlegg/>
                </Innholdslaster>
            </SaksoversiktArticle>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return ({
        visDokument: state.saksoversikt.visDokument,
        saksoversiktReducer: state.restEndepunkter.saksoversiktReducer,
        personReducer: state.restEndepunkter.personinformasjon
    });
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentSaksoversikt: (fødselsnummer: string) => dispatch(hentSaksoversikt(fødselsnummer)),
        hentPerson: fødselsnummer => hentAllPersonData(dispatch, fødselsnummer),
        settAtStandaloneVinduErÅpnet: () => dispatch(setErStandaloneVindu(true)),
        velgOgVis: (sakstema: Sakstema, dokument: DokumentMetadata, enkeltdokument: Dokument) => {
            dispatch(settValgtSakstema(sakstema));
            dispatch(settValgtDokument(dokument));
            dispatch(settVisDokument(true));
            dispatch(settValgtEnkeltdokument(enkeltdokument));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaksoversiktMicroFrontend);
