import * as React from 'react';
import {
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
import Dokument from '../../../../../svg/Dokument';
import DokumentIkkeTilgangMerket from '../../../../../svg/DokumentIkkeTilgangMerket';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import { AnyAction, Dispatch } from 'redux';
import { settValgtDokument, settValgtEnkeltdokument, settVisDokument } from '../../../../../redux/saksoversikt/actions';
import { connect } from 'react-redux';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { AppState } from '../../../../../redux/reducers';
import { Person, PersonRespons } from '../../../../../models/person/person';
import { DeprecatedRestResource, isLoaded } from '../../../../../redux/restReducers/deprecatedRestResource';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { paths } from '../../../../routes/routing';
import Element from 'nav-frontend-typografi/lib/element';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { LenkeKnapp } from '../../../../../components/common-styled-components';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';
import IfFeatureToggleOn from '../../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';

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
    bruker: DeprecatedRestResource<PersonRespons>;
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

function dokumentIkon(harTilgang: boolean) {
    if (harTilgang) {
        return <Dokument />;
    } else {
        return <DokumentIkkeTilgangMerket aria-label="Du har ikke tilgang til dette dokumentet" />;
    }
}

function lagSaksoversiktLenke(props: Props) {
    const brukersFnr = isLoaded(props.bruker) ? (props.bruker.data as Person).fødselsnummer : '';
    const sakstemaQuery = `sakstemaKode=${props.sakstemakode}`;
    const journalpostQuery = `journalpostId=${props.dokument.journalpostId}`;
    const dokumentQuery = `dokumentId=${props.dokument.hoveddokument.dokumentreferanse}`;
    return `${paths.saksoversikt}/${brukersFnr}?${sakstemaQuery}&${journalpostQuery}&${dokumentQuery}`;
}

function valgtTekst(visTekst: boolean) {
    return visTekst ? ' (Dokumentet vises til høyre)' : '';
}

class DokumentListeElement extends React.Component<Props> {
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
            this.visDokumentHvisTilgang(this.props.dokument.hoveddokument, this.props.dokument);
        }
    }

    visDokumentHvisTilgang(dokument: Enkeltdokument, dokumentMetadata: DokumentMetadata) {
        if (this.dokumentKanVises(dokument, dokumentMetadata)) {
            this.props.velgOgVisDokument(dokument);
        }
    }

    render() {
        const dokumentMetadata = this.props.dokument;
        const brukersNavn = isLoaded(this.props.bruker) ? (this.props.bruker.data as Person).navn.sammensatt : '';

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

        const kanVises = this.dokumentKanVises(dokumentMetadata.hoveddokument, dokumentMetadata);

        const egetVinduLenke = !this.props.erStandaloneVindu && kanVises && (
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
                valgt={this.props.dokument === this.props.valgtDokument && this.props.visDokument}
                klikkbar={kanVises}
            >
                <IkonWrapper>{dokumentIkon(kanVises)}</IkonWrapper>
                <InnholdWrapper>
                    <UUcustomOrder>
                        <div ref={this.hoveddokumentLinkRef} className="order-second">
                            <LenkeKnapp
                                aria-disabled={!kanVises}
                                onClick={() =>
                                    this.visDokumentHvisTilgang(dokumentMetadata.hoveddokument, dokumentMetadata)
                                }
                            >
                                <Element>{dokumentMetadata.hoveddokument.tittel}</Element>
                            </LenkeKnapp>
                        </div>
                        <div className="order-first">
                            <Innholdslaster avhengigheter={[this.props.bruker]} spinnerSize={'XXS'}>
                                <Normaltekst>{formaterDatoOgAvsender(brukersNavn, dokumentMetadata)}</Normaltekst>
                            </Innholdslaster>
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

    private dokumentKanVises(dokument: Enkeltdokument, dokumentMetadata: DokumentMetadata) {
        return (
            this.props.harTilgangTilSakstema &&
            dokument.kanVises &&
            dokumentMetadata.feil.feilmelding !== Feilmelding.Sikkerhetsbegrensning
        );
    }

    private vedleggItem(vedlegg: Enkeltdokument, dokumentMetadata: DokumentMetadata) {
        if (!vedlegg.logiskDokument) {
            return (
                <LenkeKnapp
                    aria-disabled={vedlegg.kanVises}
                    onClick={() => this.visDokumentHvisTilgang(vedlegg, dokumentMetadata)}
                >
                    <Element>{vedlegg.tittel}</Element>
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
            dispatch(settValgtDokument(ownProps.dokument));
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
