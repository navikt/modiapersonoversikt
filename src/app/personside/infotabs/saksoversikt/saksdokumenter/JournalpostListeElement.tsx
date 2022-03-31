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
import EtikettGraa from '../../../../../components/EtikettGraa';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import DokumentLenke from './DokumentLenke';
import { guid } from 'nav-frontend-js-utils';
import { useHentPersondata } from '../../../../../utils/customHooks';
import { hasData } from '@nutgaard/use-fetch';
import { hentNavn } from '../../../visittkort-v2/visittkort-utils';
import { sakstemakodeAlle } from '../utils/saksoversiktUtils';
import { useHentAlleSakstemaFraResource, useSakstemaURLState } from '../useSakstemaURLState';

interface Props {
    journalpost: Journalpost;
    harTilgangTilSakstema: boolean;
    valgtSakstema: Sakstema;
}

const StyledArticle = styled.article<{ valgt: boolean }>`
    ${(props) =>
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

function tekstBasertPaRetning(brukernavn: string, dokument: Journalpost) {
    switch (dokument.retning) {
        case Kommunikasjonsretning.Inn:
            return dokument.avsender === Entitet.Sluttbruker ? `Fra ${brukernavn}` : `Fra ${dokument.navn}`;
        case Kommunikasjonsretning.Ut:
            return utgaendeTekst(dokument.mottaker, dokument.navn);
        case Kommunikasjonsretning.Intern:
            return 'Notat';
        default:
            return 'Ukjent kommunikasjonsretning';
    }
}

function utgaendeTekst(mottaker: Entitet, mottakernavn: string) {
    const dokumentmottaker = mottaker === Entitet.Sluttbruker ? '' : `(Sendt til ${mottakernavn})`;
    return `Fra NAV ${dokumentmottaker}`;
}

function formaterDatoOgAvsender(brukernavn: string, dokument: Journalpost) {
    const dato = dayjs(saksdatoSomDate(dokument.dato)).format('DD.MM.YYYY');
    return `${dato} / ${tekstBasertPaRetning(brukernavn, dokument)}`;
}

function getDokumentIkon(harTilgang: boolean) {
    if (harTilgang) {
        return <DokumentIkon />;
    } else {
        return <DokumentIkkeTilgangIkon aria-label="Du har ikke tilgang til dette dokumentet" />;
    }
}

function JournalpostListeElement(props: Props) {
    const alleSakstema = useHentAlleSakstemaFraResource();
    const { valgtJournalpost } = useSakstemaURLState(alleSakstema);
    const vedleggLinkRef = React.createRef<HTMLUListElement>();
    const hoveddokumentLinkRef = React.createRef<HTMLDivElement>();
    const brukerResponse = useHentPersondata();
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
    const brukersNavn = hasData(brukerResponse) ? hentNavn(brukerResponse.data.person.navn.firstOrNull()) : '';

    const saksid = journalpost.tilhørendeFagsaksid ? journalpost.tilhørendeFagsaksid : journalpost.tilhørendeSaksid;
    const saksvisning =
        props.valgtSakstema.temakode === sakstemakodeAlle ? (
            <EtikettGraa>
                {props.valgtSakstema.temanavn} / Saksid: {saksid}
            </EtikettGraa>
        ) : (
            <EtikettGraa>Saksid: {saksid}</EtikettGraa>
        );

    const dokumentVedlegg = journalpost.vedlegg && journalpost.vedlegg.length > 0 && (
        <VedleggStyle>
            <Normaltekst>Dokumentet har {journalpost.vedlegg.length} vedlegg:</Normaltekst>
            <ul ref={vedleggLinkRef}>
                {journalpost.vedlegg.map((vedlegg, index) => (
                    <li key={index}>
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
            <StyledArticle valgt={journalpost === valgtJournalpost} aria-labelledby={tittelId.current}>
                <IkonWrapper>{getDokumentIkon(harTilgangTilJournalpost(journalpost))}</IkonWrapper>
                <InnholdWrapper>
                    <UUcustomOrder id={tittelId.current}>
                        <h4 ref={hoveddokumentLinkRef} className="order-second">
                            <DokumentLenke
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

export default JournalpostListeElement;
