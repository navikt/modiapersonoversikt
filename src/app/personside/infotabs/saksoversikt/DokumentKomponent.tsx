import * as React from 'react';
import {
    Dokument as Enkeltdokument,
    DokumentMetadata,
    Entitet,
    KategoriNotat,
    Kommunikasjonsretning
} from '../../../../models/saksoversikt/dokumentmetadata';
import styled, { css } from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import * as moment from 'moment';
import { saksdatoSomDate } from '../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import Dokument from '../../../../svg/Dokument';
import DokumentIkkeTilgangMerket from '../../../../svg/DokumentIkkeTilgangMerket';
import { sakstemakodeAlle } from './SakstemaListe';
import { AnyAction, Dispatch } from 'redux';
import { settValgtDokument, settValgtEnkeltdokument, settVisDokument } from '../../../../redux/saksoversikt/actions';
import { connect } from 'react-redux';
import { cancelIfHighlighting } from '../../../../utils/functionUtils';
import { AppState } from '../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../models/person/person';
import { isLoaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import Innholdslaster from '../../../../components/Innholdslaster';
import { paths } from '../../../routes/routing';
import Element from 'nav-frontend-typografi/lib/element';
import EtikettGrå from '../../../../components/EtikettGrå';
import { LenkeKnapp } from '../../../../components/common-styled-components';
import { eventTagetIsInsideRef } from '../../../../utils/reactRefUtils';

interface OwnProps {
    dokument: DokumentMetadata;
    harTilgangTilSakstema: boolean;
    sakstemakode: string;
    sakstemanavn: string;
}

interface DispatchProps {
    velgOgVisDokument: (enkeltdokument: Enkeltdokument) => void;
}

interface StateProps {
    bruker: RestReducer<PersonRespons>;
    erStandaloneVindu: boolean;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltDokument?: Enkeltdokument;
    visDokument: boolean;
}

type Props = OwnProps & DispatchProps & StateProps;

const Wrapper = styled.div<{ valgt: boolean; klikkbar: boolean; }>`
  ${props => props.valgt && css`background-color: rgba(0, 0, 0, 0.09);`}
  padding: ${theme.margin.px20} ${theme.margin.px10};
  display: flex;
  svg {
    padding-right: 1rem;
    height: ${theme.margin.px30};
    width: auto;
  }
  ${props => props.klikkbar && css`
      cursor: pointer;
      &:hover {
          ${theme.hover};
        }
      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }`
  }
`;

const InnholdWrapper = styled.div`
  flex-grow: 1;
  > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

function tekstBasertPåRetning(brukernavn: string, dokument: DokumentMetadata) {
    switch (dokument.retning) {
        case Kommunikasjonsretning.Inn:
            return dokument.avsender === Entitet.Sluttbruker ? `Fra ${brukernavn}` : `Fra ${dokument.navn}`;
        case Kommunikasjonsretning.Ut:
            return utgåendeTekst(dokument.mottaker, dokument.navn);
        case Kommunikasjonsretning.Intern:
            return dokument.kategoriNotat === KategoriNotat.Forvaltningsnotat ? 'Samtalereferat' : 'Notat';
        default:
            return 'Ukjent kommunikasjonsretning';
    }
}

function utgåendeTekst(mottaker: Entitet, mottakernavn: string) {
    const dokumentmottaker = mottaker === Entitet.Sluttbruker ? '' : `(Sendt til ${mottakernavn})`;
    return `Fra NAV ${dokumentmottaker}`;
}

function formaterDatoOgAvsender(brukernavn: string, dokument: DokumentMetadata) {
    const dato = moment(saksdatoSomDate(dokument.dato)).format('DD.MM.YYYY');
    return `${dato} / ${tekstBasertPåRetning(brukernavn, dokument)}`;
}

function dokumentIkon(harTilgang: boolean) {
    if (harTilgang) {
        return <Dokument/>;
    } else {
        return <DokumentIkkeTilgangMerket/>;
    }
}

function lagSaksoversiktLenke(props: Props) {
    const brukersFnr = isLoaded(props.bruker)
        ? (props.bruker.data as Person).fødselsnummer
        : '';
    const sakstemaQuery = `sakstemaKode=${props.sakstemakode}`;
    const journalpostQuery = `journalpostId=${props.dokument.journalpostId}`;
    const dokumentQuery = `dokumentId=${props.dokument.hoveddokument.dokumentreferanse}`;
    return `${paths.saksoversikt}/${brukersFnr}?${sakstemaQuery}&${journalpostQuery}&${dokumentQuery}`;
}

function valgtTekst(visTekst: boolean) {
    return visTekst ? ' (Dokumentet vises til høyre)' : '';
}

class DokumentKomponent extends React.Component<Props> {
    private vedleggLinkRef = React.createRef<HTMLAnchorElement>();
    private hoveddokumentLinkRef = React.createRef<HTMLDivElement>();
    private dokumentRef = React.createRef<HTMLDivElement>();
    private nyttVinduLinkRef = React.createRef<HTMLSpanElement>();

    handleClickOnDokument(event: React.MouseEvent<HTMLElement>) {
        const lenkeTrykket =
            eventTagetIsInsideRef(event, [this.hoveddokumentLinkRef, this.vedleggLinkRef, this.nyttVinduLinkRef]);

        if (!lenkeTrykket) {
            this.visDokumentHvisTilgang(this.props.dokument, this.props.dokument.hoveddokument);
        }
    }

    visDokumentHvisTilgang(dokument: DokumentMetadata, enkeltdokument: Enkeltdokument) {
        if (this.props.harTilgangTilSakstema && enkeltdokument.kanVises) {
            this.props.velgOgVisDokument(enkeltdokument);
        }
    }

    render() {
        const dokument = this.props.dokument;
        const brukersNavn = isLoaded(this.props.bruker)
            ? (this.props.bruker.data as Person).navn.sammensatt
            : '';

        const saksid = dokument.tilhørendeFagsaksid ? dokument.tilhørendeFagsaksid : dokument.tilhørendeSaksid;
        const saksvisning = this.props.sakstemakode === sakstemakodeAlle ?
            (
                <EtikettGrå>Saksid: {saksid} / Sakstema: {this.props.sakstemanavn}</EtikettGrå>
            ) :
            (
                <EtikettGrå>Saksid: {saksid}</EtikettGrå>
            );

        const dokumentVedlegg = dokument.vedlegg && dokument.vedlegg.length > 0 &&
            (
                <div>
                    <Normaltekst>Dokumentet har {dokument.vedlegg.length} vedlegg:</Normaltekst>
                    <ul>
                        {dokument.vedlegg.map(vedlegg =>
                            <li key={vedlegg.dokumentreferanse + dokument.journalpostId}>
                                <span ref={this.vedleggLinkRef}>
                                    <LenkeKnapp
                                        aria-label={'Vis vedlegg - ' + vedlegg.tittel}
                                        onClick={() => this.visDokumentHvisTilgang(dokument, vedlegg)}
                                    >
                                        <Element>{vedlegg.tittel}</Element>
                                    </LenkeKnapp>
                                </span>
                                {valgtTekst(vedlegg === this.props.valgtEnkeltDokument && this.props.visDokument)}
                            </li>)}
                    </ul>
                </div>
            );

        const kanVises = this.props.harTilgangTilSakstema && dokument.hoveddokument.kanVises;
        const egetVinduLenke = !this.props.erStandaloneVindu && kanVises && (
                <span ref={this.nyttVinduLinkRef}>
                    <a href={lagSaksoversiktLenke(this.props)} target={'_blank'} className={'lenke'}>
                        Åpne i eget vindu
                    </a>
                </span>
            );

        const hoveddokumentErValgt = dokument.hoveddokument === this.props.valgtEnkeltDokument;

        return (
            <Wrapper
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                    cancelIfHighlighting(() => this.handleClickOnDokument(event))}
                ref={this.dokumentRef}
                valgt={this.props.dokument === this.props.valgtDokument && this.props.visDokument}
                klikkbar={kanVises}
            >
                {dokumentIkon(kanVises)}
                <InnholdWrapper>
                    <Innholdslaster avhengigheter={[this.props.bruker]} spinnerSize={'XXS'}>
                        <Normaltekst>
                            {formaterDatoOgAvsender(brukersNavn, dokument)}
                        </Normaltekst>
                    </Innholdslaster>
                    <div ref={this.hoveddokumentLinkRef}>
                        <LenkeKnapp
                            aria-label={'Vis hoveddokument - ' + dokument.hoveddokument.tittel}
                            onClick={() => this.visDokumentHvisTilgang(dokument, dokument.hoveddokument)}
                        >
                            <Element>{dokument.hoveddokument.tittel}</Element>
                        </LenkeKnapp>
                    </div>
                    {valgtTekst(hoveddokumentErValgt && this.props.visDokument)}
                    {dokumentVedlegg}
                    {saksvisning}
                </InnholdWrapper>
                {egetVinduLenke}
            </Wrapper>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: OwnProps): DispatchProps {
    return {
        velgOgVisDokument: enkeltdokument => {
            dispatch(settValgtDokument(ownProps.dokument));
            dispatch(settVisDokument(true));
            dispatch(settValgtEnkeltdokument(enkeltdokument));
        }
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        bruker: state.restEndepunkter.personinformasjon,
        erStandaloneVindu: state.saksoversikt.erStandaloneVindu,
        valgtDokument: state.saksoversikt.valgtDokument,
        valgtEnkeltDokument: state.saksoversikt.valgtEnkeltdokument,
        visDokument: state.saksoversikt.visDokument
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DokumentKomponent);