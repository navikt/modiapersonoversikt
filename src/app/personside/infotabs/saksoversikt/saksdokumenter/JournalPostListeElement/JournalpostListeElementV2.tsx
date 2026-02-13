import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { createRef, useRef } from 'react';
import styled, { css } from 'styled-components';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import { saksdatoSomDate } from '../../../../../../models/saksoversikt/fellesSak';
import {
    type Dokument as Enkeltdokument,
    Entitet,
    Feilmelding,
    type Journalpost,
    Kommunikasjonsretning
} from '../../../../../../models/saksoversikt/journalpost';
import type { Sakstema } from '../../../../../../models/saksoversikt/sakstema';
import persondataResource from '../../../../../../rest/resources/persondataResource';
import theme from '../../../../../../styles/personOversiktTheme';
import DokumentIkkeTilgangIkon from '../../../../../../svg/DokumentIkkeTilgangIkon';
import DokumentIkon from '../../../../../../svg/DokumentIkon';
import { hentNavn } from '../../../../visittkort-v2/visittkort-utils';
import { useHentAlleSakstemaFraResourceV2, useSakstemaURLStateV2 } from '../../useSakstemaURLState';
import { sakstemakodeAlle } from '../../utils/saksoversiktUtilsV2';
import DokumentLenke from '../DokumentLenke';
import JournalpostLestAvBruker from './JournalpostLestAvBruker';

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

const SaksVisiningOgLestWrapper = styled.div`
    display: flex;
    justify-content: space-between;
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
    }
    return <DokumentIkkeTilgangIkon aria-label="Du har ikke tilgang til dette dokumentet" />;
}

function JournalpostListeElementV2(props: Props) {
    const { alleSakstema } = useHentAlleSakstemaFraResourceV2();
    const { valgtJournalpost } = useSakstemaURLStateV2(alleSakstema);
    const vedleggLinkRef = createRef<HTMLUListElement>();
    const hoveddokumentLinkRef = createRef<HTMLDivElement>();
    const brukerResponse = persondataResource.useFetch();
    const tittelId = useRef(guid());

    const dokumentKanVises = (dokument: Enkeltdokument, journalpost: Journalpost) => {
        return !dokument.logiskDokument && harTilgangTilJournalpost(journalpost);
    };

    const harTilgangTilJournalpost = (journalpost: Journalpost) => {
        const saksid = journalpost.tilhorendeFagsaksid
            ? journalpost.tilhorendeFagsaksid
            : journalpost.tilhorendeSaksid
              ? journalpost.tilhorendeSaksid
              : '';
        return (
            props.harTilgangTilSakstema &&
            journalpost.feil.feilmelding !== Feilmelding.Sikkerhetsbegrensning &&
            saksid.length !== 0
        );
    };

    const journalpost = props.journalpost;
    const brukersNavn = brukerResponse.data ? hentNavn(brukerResponse.data.person.navn.firstOrNull()) : '';

    const saksid = journalpost.tilhorendeFagsaksid ? journalpost.tilhorendeFagsaksid : journalpost.tilhorendeSaksid;
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
                    <SaksVisiningOgLestWrapper>
                        {saksvisning}
                        <JournalpostLestAvBruker journalpost={journalpost} />
                    </SaksVisiningOgLestWrapper>
                </InnholdWrapper>
            </StyledArticle>
        </li>
    );
}

export default JournalpostListeElementV2;
