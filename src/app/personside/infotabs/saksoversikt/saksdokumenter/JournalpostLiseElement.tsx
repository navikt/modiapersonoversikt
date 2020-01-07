import * as React from 'react';
import {
    Dokument as Enkeltdokument,
    Entitet,
    Feilmelding,
    Journalpost,
    Kommunikasjonsretning
} from '../../../../../models/saksoversikt/journalpost';
import styled, { css } from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import moment from 'moment';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import DokumentIkkeTilgangIkon from '../../../../../svg/DokumentIkkeTilgangIkon';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';
import IfFeatureToggleOn from '../../../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../../../components/featureToggle/toggleIDs';
import { isLoadedPerson } from '../../../../../redux/restReducers/personinformasjon';
import { erNyePersonoversikten } from '../../../../../utils/erNyPersonoversikt';
import { useHistory } from 'react-router-dom';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { useRestResource } from '../../../../../utils/customHooks';
import { useInfotabsDyplenker } from '../../dyplenker';
import DokumentLenke from './DokumentLenke';
import { erSakerFullscreen } from '../utils/erSakerFullscreen';

interface Props {
    journalpost: Journalpost;
    harTilgangTilSakstema: boolean;
    valgtSakstema: Sakstema;
}

const ListeElementStyle = styled.li<{ valgt: boolean; klikkbar: boolean }>`
    ${props =>
        props.valgt &&
        css`
            background-color: rgba(0, 0, 0, 0.09);
        `};
    padding: ${theme.margin.layout};
    display: flex;
    align-items: flex-start;
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
        `};
`;

const InnholdWrapper = styled.div`
    flex-grow: 1;
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
    width: 0; /* IE-fix*/
`;

const IkonWrapper = styled.div`
    svg {
        height: ${theme.margin.px30};
        width: ${theme.margin.px30};
        opacity: 0.5;
    }
    padding-right: 1rem;
`;

const StyledLink = styled.a`
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

const VedleggStyle = styled.div`
    ul {
        list-style: disc;
    }
`;

function tekstBasertPåRetning(brukernavn: string, dokument: Journalpost) {
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

function formaterDatoOgAvsender(brukernavn: string, dokument: Journalpost) {
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

function JournalpostLiseElement(props: Props) {
    const vedleggLinkRef = React.createRef<HTMLUListElement>();
    const hoveddokumentLinkRef = React.createRef<HTMLDivElement>();
    const dokumentRef = React.createRef<HTMLLIElement>();
    const nyttVinduLinkRef = React.createRef<HTMLAnchorElement>();
    const bruker = useRestResource(resources => resources.personinformasjon);
    const dyplenker = useInfotabsDyplenker();
    const history = useHistory();

    const dokumentKanVises = (dokument: Enkeltdokument, journalpost: Journalpost) => {
        return dokument.kanVises && harTilgangTilJournalpost(journalpost);
    };

    const harTilgangTilJournalpost = (journalpost: Journalpost) => {
        const saksid = journalpost.tilhørendeFagsaksid
            ? journalpost.tilhørendeFagsaksid
            : journalpost.tilhørendeSaksid
            ? journalpost.tilhørendeSaksid
            : '';
        return (
            props.harTilgangTilSakstema &&
            journalpost.feil.feilmelding !== Feilmelding.Sikkerhetsbegrensning &&
            saksid.length !== 0
        );
    };

    const handleClickOnDokument = (event: React.MouseEvent<HTMLElement>) => {
        const lenkeTrykket = eventTagetIsInsideRef(event, [hoveddokumentLinkRef, vedleggLinkRef, nyttVinduLinkRef]);

        if (!lenkeTrykket) {
            visDokumentHvisTilgang(props.journalpost.hoveddokument, props.journalpost);
        }
    };

    const visDokumentHvisTilgang = (dokument: Enkeltdokument, journalpost: Journalpost) => {
        if (dokumentKanVises(dokument, journalpost)) {
            history.push(dyplenker.saker.link(props.valgtSakstema, dokument));
        }
    };

    const journalpost = props.journalpost;
    const brukersNavn = isLoadedPerson(bruker) ? bruker.data.navn.sammensatt : '';

    const saksid = journalpost.tilhørendeFagsaksid ? journalpost.tilhørendeFagsaksid : journalpost.tilhørendeSaksid;
    const saksvisning =
        props.valgtSakstema.temakode === sakstemakodeAlle ? (
            <EtikettGrå>
                {props.valgtSakstema.temanavn} / Saksid: {saksid}
            </EtikettGrå>
        ) : (
            <EtikettGrå>Saksid: {saksid}</EtikettGrå>
        );

    const dokumentVedlegg = journalpost.vedlegg && journalpost.vedlegg.length > 0 && (
        <VedleggStyle>
            <Normaltekst>Dokumentet har {journalpost.vedlegg.length} vedlegg:</Normaltekst>
            <ul ref={vedleggLinkRef}>
                {journalpost.vedlegg.map(vedlegg => (
                    <li key={vedlegg.dokumentreferanse + journalpost.journalpostId}>
                        <DokumentLenke
                            dokument={vedlegg}
                            valgtSakstema={props.valgtSakstema}
                            kanVises={!vedlegg.logiskDokument}
                            journalPost={journalpost}
                        />
                    </li>
                ))}
            </ul>
        </VedleggStyle>
    );

    const tilgangTilHoveddokument = dokumentKanVises(journalpost.hoveddokument, journalpost);

    const egetVinduLenke = !erSakerFullscreen() && tilgangTilHoveddokument && (
        <StyledLink
            ref={nyttVinduLinkRef}
            href={dyplenker.saker.link(props.valgtSakstema, journalpost.hoveddokument, true)}
            target={'_blank'}
            className={'lenke'}
        >
            Åpne i nytt vindu
        </StyledLink>
    );
    const hovedDokument = journalpost.hoveddokument;

    return (
        <ListeElementStyle
            onClick={(event: React.MouseEvent<HTMLElement>) => cancelIfHighlighting(() => handleClickOnDokument(event))}
            ref={dokumentRef}
            valgt={dyplenker.saker.erValgtJournalpost(props.journalpost)}
            klikkbar={tilgangTilHoveddokument}
        >
            <IkonWrapper>{getDokumentIkon(harTilgangTilJournalpost(journalpost))}</IkonWrapper>
            <InnholdWrapper>
                <UUcustomOrder>
                    <div ref={hoveddokumentLinkRef} className="order-second">
                        <DokumentLenke
                            key={hovedDokument.dokumentreferanse + journalpost.journalpostId}
                            dokument={hovedDokument}
                            valgtSakstema={props.valgtSakstema}
                            kanVises={tilgangTilHoveddokument && dokumentKanVises(hovedDokument, journalpost)}
                            journalPost={journalpost}
                        />
                    </div>
                    <div className="order-first">
                        <Normaltekst>{formaterDatoOgAvsender(brukersNavn, journalpost)}</Normaltekst>
                    </div>
                </UUcustomOrder>
                {dokumentVedlegg}
                {saksvisning}
            </InnholdWrapper>
            {erNyePersonoversikten() ? (
                egetVinduLenke
            ) : (
                <IfFeatureToggleOn toggleID={FeatureToggles.SaksoversiktNyttVindu}>{egetVinduLenke}</IfFeatureToggleOn>
            )}
        </ListeElementStyle>
    );
}

export default JournalpostLiseElement;
