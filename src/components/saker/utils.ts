import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { apiBaseUri } from 'src/api/config';
import type { SakerFilter } from 'src/components/saker/List/Filter';
import { sakerFilterAtom } from 'src/components/saker/List/Filter';
import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import type {
    Dokument,
    Dokumentmetadata,
    Person,
    ResultatSaksDokumenter,
    SaksDokumenter
} from 'src/lib/types/modiapersonoversikt-api';
import {
    DokumentmetadataAvsender,
    DokumentmetadataMottaker,
    DokumentmetadataRetning,
    FeilFeilmelding
} from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { parseQueryString } from 'src/utils/url-utils';

const filterSaker = (saker: SaksDokumenter[], filters: SakerFilter): SaksDokumenter[] => {
    const { saksId, temaer, status, dateRange } = filters;

    if (!saker || saker.length === 0) {
        return [];
    }

    let filteredList = saker;
    if (saksId) {
        filteredList = filteredList.filter((sak) => (sak.fagsaksnummer || sak.saksid).startsWith(saksId));
    }

    if (temaer?.length) {
        filteredList = filteredList.filter((sak) => temaer.includes(sak.temakode));
    }

    if (status?.length) {
        filteredList = filteredList.filter((sak) =>
            status.includes(sak.avsluttet ? sakStatusAvsluttet : sakStatusAapen)
        );
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((sak) => {
            const dato = dayjs(sak.opprettet);
            return dato.isSameOrAfter(dateRange.from) && dato.isSameOrBefore(dateRange.to);
        });
    }

    return filteredList;
};

export const useFilterSaker = (): QueryResult<ResultatSaksDokumenter> => {
    const filters = useAtomValue(sakerFilterAtom);
    const sakerDokumenterResponse = useSakerDokumenter();

    const saker = sakerDokumenterResponse?.data?.saker ?? [];
    const errorMessages = [errorPlaceholder(sakerDokumenterResponse, responseErrorMessage('saker og dokumenter'))];
    const sortedSaker = saker.toSorted(datoSynkende((t) => t.opprettet || new Date(0)));

    return {
        ...sakerDokumenterResponse,
        data: {
            ...sakerDokumenterResponse?.data,
            saker: filterSaker(sortedSaker, filters) ?? []
        },
        errorMessages: errorMessages.filter(Boolean)
    } as QueryResult<ResultatSaksDokumenter>;
};

export const useTemaer = () => {
    const { data } = useSakerDokumenter();
    const temaer = data?.temaer ?? [];

    return useMemo(() => temaer, [temaer]);
};

export const feilmelding = (statusKode: number) => {
    switch (statusKode) {
        case 401:
        case 403:
            return 'Du har ikke tilgang til dette dokumentet.';
        case 404:
            return 'Dokument ikke funnet.';
        default:
            return `Ukjent feil ved henting av dokument. Kontakt brukerstøtte. Feilkode: ${statusKode}`;
    }
};

export const byggDokumentVisningUrl = (url: string): string => {
    const { journalpost, dokument } = parseQueryString<{ journalpost: string; dokument: string }>(url); // Format til url: 'journalpost=etcoicxr&dokument=q90p8dnw'
    return `${apiBaseUri}/saker/dokument/${journalpost}/${dokument}`;
};

export const getSakId = (sak: SaksDokumenter) => `${sak.temakode}-${sak.fagsaksnummer}`;

export const sakerAvsender = [
    { value: DokumentmetadataAvsender.NAV, label: 'Nav' },
    { value: DokumentmetadataAvsender.SLUTTBRUKER, label: 'Bruker' },
    { value: DokumentmetadataAvsender.EKSTERN_PART, label: 'Ekstern' },
    { value: DokumentmetadataAvsender.UKJENT, label: 'Ukjent' }
];
const sakStatusAapen = 'åpen';
const sakStatusAvsluttet = 'avsluttet';
export const sakStatuser = [sakStatusAapen, sakStatusAvsluttet];
const sakstemakodeAlle = 'ALLE';

export const constructNorg2FrontendLink = (
    baseUrl: string,
    valgtSak?: SaksDokumenter,
    geografiskTilknytning?: string
): string => {
    const temaQuery = valgtSak ? buildTemaQueryForNorg(valgtSak) : '';
    return `${baseUrl}/#/startsok?tema=${temaQuery}&gt=${geografiskTilknytning || ''}`;
};

const buildTemaQueryForNorg = (sak: SaksDokumenter): string => {
    if (sak.temakode !== sakstemakodeAlle) {
        return sak.temakode;
    }

    const uniqueTemakodes = sak.tilhorendeDokumenter.reduce((acc: string[], journal: Dokumentmetadata) => {
        if (!acc.includes(journal.temakode)) {
            acc.push(journal.temakode);
        }
        return acc;
    }, []);

    return uniqueTemakodes.join(',');
};

export const dokumentKanVises = (journalpost: Dokumentmetadata, dokument: Dokument) => {
    return !dokument.logiskDokument && harTilgangTilJournalpost(journalpost);
};

const harTilgangTilJournalpost = (journalpost: Dokumentmetadata) => {
    const saksid = journalpost.tilhorendeFagsaksid || journalpost.tilhorendeSaksid || '';
    return journalpost.feil?.feilmelding !== FeilFeilmelding.SIKKERHETSBEGRENSNING && saksid.length !== 0;
};

export const tekstBasertPaRetning = (brukernavn: string, journalpost: Dokumentmetadata) => {
    switch (journalpost.retning) {
        case DokumentmetadataRetning.INN:
            return journalpost.avsender === DokumentmetadataAvsender.SLUTTBRUKER
                ? `Fra ${brukernavn}`
                : `Fra ${journalpost.navn}`;
        case DokumentmetadataRetning.UT:
            return utgaendeTekst(journalpost.mottaker, journalpost.navn);
        case DokumentmetadataRetning.INTERN:
            return 'Notat';
        default:
            return 'Ukjent kommunikasjonsretning';
    }
};

const utgaendeTekst = (mottaker: DokumentmetadataMottaker, mottakernavn: string) => {
    const dokumentmottaker = mottaker === DokumentmetadataMottaker.SLUTTBRUKER ? '' : `(Sendt til ${mottakernavn})`;
    return `Fra NAV ${dokumentmottaker}`;
};

export function hentBrukerNavn(person: Person | null): string {
    const navn = person?.navn.firstOrNull();
    if (!navn) {
        return 'Ukjent navn';
    }
    return navn.fornavn + (navn.mellomnavn ? ` ${navn.mellomnavn} ` : ' ') + navn.etternavn;
}

export function getSaksdokumentUrl(journalpostId?: string, dokumentreferanse?: string) {
    return `journalpost=${journalpostId}&dokument=${dokumentreferanse}`;
}
