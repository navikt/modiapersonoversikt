import * as React from 'react';
import {
    Dokument,
    Dokument as Enkeltdokument,
    DokumentMetadata,
    Entitet,
    Feilmelding,
    Kommunikasjonsretning
} from '../../../../../models/saksoversikt/dokumentmetadata';
import styled, { css } from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import moment from 'moment';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import DokumentIkkeTilgangIkon from '../../../../../svg/DokumentIkkeTilgangIkon';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import { AnyAction, Dispatch } from 'redux';
import { settValgtDokument, settValgtEnkeltdokument, settVisDokument } from '../../../../../redux/saksoversikt/actions';
import { connect } from 'react-redux';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { AppState } from '../../../../../redux/reducers';
import { PersonRespons } from '../../../../../models/person/person';
import { paths } from '../../../../routes/routing';
import { Element } from 'nav-frontend-typografi';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { LenkeKnapp } from '../../../../../components/common-styled-components';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';
import IfFeatureToggleOn from '../../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';
import { isLoadedPerson } from '../../../../../redux/restReducers/personinformasjon';
import { RestResource } from '../../../../../rest/utils/restResource';

interface OwnProps {
    dokumentMetadata: DokumentMetadata;
    harTilgangTilSakstema: boolean;
    sakstemakode: string;
    sakstemanavn: string;
}

interface DispatchProps {
    velgOgVisDokument: (enkeltdokument: Enkeltdokument) => void;
}

interface StateProps {
    bruker: RestResource<PersonRespons>;
    erStandaloneVindu: boolean;
    valgtDokument?: DokumentMetadata;
    valgtEnkeltDokument?: Enkeltdokument;
    visDokument: boolean;
}

type Props = OwnProps & DispatchProps & StateProps;

const ListeElementStyle = styled.li<{ valgt: boolean; klikkbar: boolean }>`
    ${props =>
        props.valgt &&
        css`
            background-color: rgba(0, 0, 0, 0.09);
        `};
    padding: ${theme.margin.px20} ${theme.margin.px10};
    display: flex;
    ${props =>
        props.klikkbar &&
        css`
            cursor: pointer;
            &:hover {
                ${theme.hover};
            }
            &:active {
                background-color: rgba(0, 0, 0, 0.1);
            }
        `}
`;

const InnholdWrapper = styled.div`
    flex-grow: 1;
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const IkonWrapper = styled.div`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
        opacity: 0.5;
    }
    padding-right: 1rem;
`;

const NyttVinduLenkeStyle = styled.span`
    white-space: nowrap;
`;

const UUcustomOrder = styled.div`
    display: flex;
    flex-direction: column;
    .order-first {
        order: 0;
    }
    .order-second {
        order: 1;
    }
`;

function tekstBasertPåRetning(brukernavn: string, dokument: DokumentMetadata) {
    switch (dokument.retning) {
        case Kommunikasjonsretning.Inn:
            return dokument.avsender === Entitet.Sluttbruker ? `Fra ${brukernavn}` : `Fra ${dokument.navn}`;
        case Kommunikasjonsretning.Ut:
            return utgåendeTekst(dokument.mottaker, dokument.navn);
        case Kommunikasjonsretning.Intern:
            return 'Notat';
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

function getDokumentIkon(harTilgang: boolean) {
    if (harTilgang) {
        return <DokumentIkon />;
    } else {
        return <DokumentIkkeTilgangIkon aria-label="Du har ikke tilgang til dette dokumentet" />;
    }
}

function lagSaksoversiktLenke(props: Props) {
    const brukersFnr = isLoadedPerson(props.bruker) ? props.bruker.data.fødselsnummer : '';
    const sakstemaQuery = `sakstemaKode=${props.sakstemakode}`;
    const journalpostQuery = `journalpostId=${props.dokumentMetadata.journalpostId}`;
    const dokumentQuery = `dokumentId=${props.dokumentMetadata.hoveddokument.dokumentreferanse}`;
    return `${paths.saksoversikt}/${brukersFnr}?${sakstemaQuery}&${journalpostQuery}&${dokumentQuery}`;
}

function valgtTekst(visTekst: boolean) {
    return visTekst ? ' (Dokumentet vises til høyre)' : '';
}

class DokumentListeElement extends React.PureComponent<Props> {
    private vedleggLinkRef = React.createRef<HTMLAnchorElement>();
    private hoveddokumentLinkRef = React.createRef<HTMLDivElement>();
    private dokumentRef = React.createRef<HTMLLIElement>();
    private nyttVinduLinkRef = React.createRef<HTMLSpanElement>();

    handleClickOnDokument(event: React.MouseEvent<HTMLElement>) {
        const lenkeTrykket = eventTagetIsInsideRef(event, [
            this.hoveddokumentLinkRef,
            this.vedleggLinkRef,
            this.nyttVinduLinkRef
        ]);

        if (!lenkeTrykket) {
            this.visDokumentHvisTilgang(this.props.dokumentMetadata.hoveddokument, this.props.dokumentMetadata);
        }
    }

    visDokumentHvisTilgang(dokument: Enkeltdokument, dokumentMetadata: DokumentMetadata) {
        if (this.dokumentKanVises(dokument, dokumentMetadata)) {
            this.props.velgOgVisDokument(dokument);
        }
    }

    render() {
        const dokumentMetadata = this.props.dokumentMetadata;
        const brukersNavn = isLoadedPerson(this.props.bruker) ? this.props.bruker.data.navn.sammensatt : '';

        const saksid = dokumentMetadata.tilhørendeFagsaksid
            ? dokumentMetadata.tilhørendeFagsaksid
            : dokumentMetadata.tilhørendeSaksid;
        const saksvisning =
            this.props.sakstemakode === sakstemakodeAlle ? (
                <EtikettGrå>
                    {this.props.sakstemanavn} / Saksid: {saksid}
                </EtikettGrå>
            ) : (
                <EtikettGrå>Saksid: {saksid}</EtikettGrå>
            );

        const dokumentVedlegg = dokumentMetadata.vedlegg && dokumentMetadata.vedlegg.length > 0 && (
            <div>
                <Normaltekst>Dokumentet har {dokumentMetadata.vedlegg.length} vedlegg:</Normaltekst>
                <ul>
                    {dokumentMetadata.vedlegg.map(vedlegg => (
                        <li key={vedlegg.dokumentreferanse + dokumentMetadata.journalpostId}>
                            <span ref={this.vedleggLinkRef}>{this.vedleggItem(vedlegg, dokumentMetadata)}</span>
                            {valgtTekst(vedlegg === this.props.valgtEnkeltDokument && this.props.visDokument)}
                        </li>
                    ))}
                </ul>
            </div>
        );

        const tilgangTilHoveddokument = this.dokumentKanVises(dokumentMetadata.hoveddokument, dokumentMetadata);

        const egetVinduLenke = !this.props.erStandaloneVindu && tilgangTilHoveddokument && (
            <NyttVinduLenkeStyle ref={this.nyttVinduLinkRef}>
                <a href={lagSaksoversiktLenke(this.props)} target={'_blank'} className={'lenke'}>
                    <Normaltekst tag="span">Åpne i eget vindu</Normaltekst>
                </a>
            </NyttVinduLenkeStyle>
        );

        const hoveddokumentErValgt = dokumentMetadata.hoveddokument === this.props.valgtEnkeltDokument;

        return (
            <ListeElementStyle
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                    cancelIfHighlighting(() => this.handleClickOnDokument(event))
                }
                ref={this.dokumentRef}
                valgt={this.props.dokumentMetadata === this.props.valgtDokument && this.props.visDokument}
                klikkbar={tilgangTilHoveddokument}
            >
                <IkonWrapper>{getDokumentIkon(this.harTilgangTilJournalpost(dokumentMetadata))}</IkonWrapper>
                <InnholdWrapper>
                    <UUcustomOrder>
                        <div ref={this.hoveddokumentLinkRef} className="order-second">
                            <LenkeKnapp
                                aria-disabled={!tilgangTilHoveddokument}
                                onClick={() =>
                                    this.visDokumentHvisTilgang(dokumentMetadata.hoveddokument, dokumentMetadata)
                                }
                            >
                                <Element>{this.dokumentTekst(dokumentMetadata.hoveddokument)}</Element>
                            </LenkeKnapp>
                        </div>
                        <div className="order-first">
                            <Normaltekst>{formaterDatoOgAvsender(brukersNavn, dokumentMetadata)}</Normaltekst>
                        </div>
                    </UUcustomOrder>
                    {valgtTekst(hoveddokumentErValgt && this.props.visDokument)}
                    {dokumentVedlegg}
                    {saksvisning}
                </InnholdWrapper>
                <IfFeatureToggleOn toggleID={FeatureToggles.SaksoversiktNyttVindu}>{egetVinduLenke}</IfFeatureToggleOn>
            </ListeElementStyle>
        );
    }

    private dokumentTekst(dokument: Dokument) {
        return dokument.tittel + (dokument.skjerming ? ' (Skjermet)' : '');
    }

    private dokumentKanVises(dokument: Enkeltdokument, dokumentMetadata: DokumentMetadata) {
        return dokument.kanVises && this.harTilgangTilJournalpost(dokumentMetadata);
    }

    private harTilgangTilJournalpost(dokumentMetadata: DokumentMetadata) {
        return (
            this.props.harTilgangTilSakstema && dokumentMetadata.feil.feilmelding !== Feilmelding.Sikkerhetsbegrensning
        );
    }

    private vedleggItem(vedlegg: Enkeltdokument, dokumentMetadata: DokumentMetadata) {
        if (!vedlegg.logiskDokument) {
            return (
                <LenkeKnapp
                    aria-disabled={!vedlegg.kanVises}
                    onClick={() => this.visDokumentHvisTilgang(vedlegg, dokumentMetadata)}
                >
                    <Element>{this.dokumentTekst(vedlegg)}</Element>
                </LenkeKnapp>
            );
        } else {
            return <Element>{vedlegg.tittel}</Element>;
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, ownProps: OwnProps): DispatchProps {
    return {
        velgOgVisDokument: enkeltdokument => {
            dispatch(settValgtDokument(ownProps.dokumentMetadata));
            dispatch(settVisDokument(true));
            dispatch(settValgtEnkeltdokument(enkeltdokument));
        }
    };
}

function mapStateToProps(state: AppState): StateProps {
    return {
        bruker: state.restResources.personinformasjon,
        erStandaloneVindu: state.saksoversikt.erStandaloneVindu,
        valgtDokument: state.saksoversikt.valgtDokument,
        valgtEnkeltDokument: state.saksoversikt.valgtEnkeltdokument,
        visDokument: state.saksoversikt.visDokument
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DokumentListeElement);
