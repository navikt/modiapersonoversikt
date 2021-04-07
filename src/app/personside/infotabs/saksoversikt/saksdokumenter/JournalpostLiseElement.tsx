import * as React from 'react';
import { useRef } from 'react';
import {
    Dokument as Enkeltdokument,
    Entitet,
    Feilmelding,
    Journalpost,
    Kommunikasjonsretning
} from '../../../../../models/saksoversikt/journalpost';
import styled, { css } from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import dayjs from 'dayjs';
import { saksdatoSomDate } from '../../../../../models/saksoversikt/fellesSak';
import { Normaltekst } from 'nav-frontend-typografi';
import DokumentIkon from '../../../../../svg/DokumentIkon';
import DokumentIkkeTilgangIkon from '../../../../../svg/DokumentIkkeTilgangIkon';
import { sakstemakodeAlle } from '../sakstemaliste/SakstemaListe';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { isLoadedPerson } from '../../../../../redux/restReducers/personinformasjon';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { useInfotabsDyplenker } from '../../dyplenker';
import DokumentLenke from './DokumentLenke';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    journalpost: Journalpost;
    harTilgangTilSakstema: boolean;
    valgtSakstema: Sakstema;
}

const StyledArticle = styled.article<{ valgt: boolean }>`
    ${props =>
        props.valgt &&
        css`
            background-color: rgba(0, 0, 0, 0.09);
        `};
    padding: ${theme.margin.layout};
    display: flex;
    align-items: flex-start;
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
    const dato = dayjs(saksdatoSomDate(dokument.dato)).format('DD.MM.YYYY');
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
    const bruker = useRestResource(resources => resources.personinformasjon);
    const dyplenker = useInfotabsDyplenker();
    const tittelId = useRef(guid());

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

    const journalpost = props.journalpost;
    const brukersNavn = isLoadedPerson(bruker.resource) ? bruker.resource.data.navn.sammensatt : '';

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

    const hovedDokument = journalpost.hoveddokument;

    return (
        <li>
            <StyledArticle
                valgt={dyplenker.saker.erValgtJournalpost(props.journalpost)}
                aria-labelledby={tittelId.current}
            >
                <IkonWrapper>{getDokumentIkon(harTilgangTilJournalpost(journalpost))}</IkonWrapper>
                <InnholdWrapper>
                    <UUcustomOrder id={tittelId.current}>
                        <h4 ref={hoveddokumentLinkRef} className="order-second">
                            <DokumentLenke
                                key={hovedDokument.dokumentreferanse + journalpost.journalpostId}
                                dokument={hovedDokument}
                                valgtSakstema={props.valgtSakstema}
                                kanVises={tilgangTilHoveddokument && dokumentKanVises(hovedDokument, journalpost)}
                                journalPost={journalpost}
                            />
                        </h4>
                        <div className="order-first">
                            <Normaltekst>{formaterDatoOgAvsender(brukersNavn, journalpost)}</Normaltekst>
                        </div>
                    </UUcustomOrder>
                    {dokumentVedlegg}
                    {saksvisning}
                </InnholdWrapper>
            </StyledArticle>
        </li>
    );
}

export default JournalpostLiseElement;
