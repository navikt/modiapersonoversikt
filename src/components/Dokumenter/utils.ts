import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { apiBaseUri } from 'src/api/config';
import type { DateRange } from 'src/components/DateFilters/types';
import { type DokumenterFilter, dokumenterFilterAtom } from 'src/components/Dokumenter/Filter';
import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import {
    type Dokument,
    type Dokumentmetadata,
    FeilFeilmelding,
    type Person,
    type ResultatSaksDokumenter
} from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { parseQueryString } from 'src/utils/url-utils';

export const useTemaerForPeriode = () => {
    const { data } = useSakerDokumenter();
    const { dateRange } = useAtomValue(dokumenterFilterAtom);
    const dokumenter = data?.dokumenter ?? [];
    const alleTemaer = data?.temaer ?? [];

    return useMemo(() => {
        const periodFiltered = dateRange ? filterByDateRange(dokumenter, dateRange) : dokumenter;
        const temakoder = new Set(periodFiltered.map((dok) => dok.temakode));
        return alleTemaer.filter((t) => temakoder.has(t.temakode));
    }, [dokumenter, dateRange, alleTemaer]);
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

export const dokumentKanVises = (journalpost: Dokumentmetadata, dokument: Dokument) => {
    return !dokument.logiskDokument && harTilgangTilJournalpost(journalpost);
};

const harTilgangTilJournalpost = (journalpost: Dokumentmetadata) => {
    const saksid = journalpost.tilhorendeFagsaksid || journalpost.tilhorendeSaksid || '';
    return journalpost.feil?.feilmelding !== FeilFeilmelding.SIKKERHETSBEGRENSNING && saksid.length !== 0;
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

export const useFilterDokumenter = (): QueryResult<ResultatSaksDokumenter> => {
    const filters = useAtomValue(dokumenterFilterAtom);
    const sakerDokumenterResponse = useSakerDokumenter();
    const dokumenter = sakerDokumenterResponse?.data?.dokumenter ?? [];

    const sortedDokumenter = dokumenter.toSorted(datoSynkende((t) => t.dato || new Date(0)));
    const errorMessages = [errorPlaceholder(sakerDokumenterResponse, responseErrorMessage('saker og dokumenter'))];

    return {
        ...sakerDokumenterResponse,
        data: {
            ...sakerDokumenterResponse?.data,
            dokumenter: filterDokumenter(sortedDokumenter, filters) ?? []
        },
        errorMessages: errorMessages.filter(Boolean)
    } as QueryResult<ResultatSaksDokumenter>;
};

const filterByDateRange = (dokumenter: Dokumentmetadata[], dateRange: DateRange): Dokumentmetadata[] =>
    dokumenter.filter((dok) => {
        const dato = dayjs(dok.dato);
        const afterFrom = !dateRange.from || dato.isSameOrAfter(dayjs(dateRange.from).startOf('day'), 'day');
        const beforeTo = !dateRange.to || dato.isSameOrBefore(dayjs(dateRange.to).endOf('day'), 'day');
        return afterFrom && beforeTo;
    });

const filterDokumenter = (dokumenter: Dokumentmetadata[], filters: DokumenterFilter): Dokumentmetadata[] => {
    const { temaer, dateRange, saksId } = filters;

    if (!dokumenter || dokumenter.length === 0) {
        return [];
    }

    let filteredList = dokumenter;

    if (saksId) {
        filteredList = filteredList.filter((dok) =>
            dok.tilhorendeFagsaksid?.toLowerCase().includes(saksId.toLowerCase())
        );
    }
    if (temaer?.length) {
        filteredList = filteredList.filter((dok) => temaer.includes(dok.temakode));
    }

    if (dateRange?.from || dateRange?.to) {
        filteredList = filterByDateRange(filteredList, dateRange);
    }

    return filteredList;
};
