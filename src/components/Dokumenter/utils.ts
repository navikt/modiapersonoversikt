import dayjs from 'dayjs';
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter';
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { apiBaseUri } from 'src/api/config';
import type { DateRange } from 'src/components/DateFilters/types';
import { type DokumenterFilter, dokumenterFilterAtom } from 'src/components/Dokumenter/Filter';
import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import {
    type Dokument,
    type Dokumentmetadata,
    DokumentmetadataAvsender,
    FeilFeilmelding,
    type ResultatSaksDokumenter,
    type Sakstema
} from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { parseQueryString } from 'src/utils/url-utils';

dayjs.extend(isSameOrBeforePlugin);
dayjs.extend(isSameOrAfterPlugin);

export const avsenderLabel: Record<DokumentmetadataAvsender, string> = {
    [DokumentmetadataAvsender.SLUTTBRUKER]: 'Bruker',
    [DokumentmetadataAvsender.NAV]: 'Nav',
    [DokumentmetadataAvsender.EKSTERN_PART]: 'Ekstern',
    [DokumentmetadataAvsender.UKJENT]: 'Ukjent'
};

const avsenderRekkefolge: DokumentmetadataAvsender[] = [
    DokumentmetadataAvsender.SLUTTBRUKER,
    DokumentmetadataAvsender.NAV,
    DokumentmetadataAvsender.EKSTERN_PART,
    DokumentmetadataAvsender.UKJENT
];

export type TemaDokumentStatistikk = Sakstema & {
    antallDokumenter: number;
    nyesteDokumentDato: string | null;
};

export const useTemaerForPeriode = (dateRange: DateRange | null) => {
    const { data } = useSakerDokumenter();
    const dokumenter = data?.dokumenter ?? [];
    const alleTemaer = data?.temaer ?? [];

    const periodFiltered = dateRange ? filterByDateRange(dokumenter, dateRange) : dokumenter;
    const temakoderNyesteForst = [
        ...new Set(periodFiltered.toSorted(datoSynkende((dok) => dok.dato)).map((dok) => dok.temakode))
    ];

    return temakoderNyesteForst
        .map((temakode) => alleTemaer.find((tema) => tema.temakode === temakode))
        .filter((tema) => tema !== undefined);
};

export const useAvsendereForPeriode = (dateRange: DateRange | null) => {
    const { data } = useSakerDokumenter();
    const dokumenter = data?.dokumenter ?? [];

    return useMemo(() => {
        const periodFiltered = dateRange ? filterByDateRange(dokumenter, dateRange) : dokumenter;
        const avsendere = new Set(periodFiltered.map((dok) => dok.avsender));
        return avsenderRekkefolge.filter((avsender) => avsendere.has(avsender));
    }, [dokumenter, dateRange]);
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

export const filterDokumenter = (dokumenter: Dokumentmetadata[], filters: DokumenterFilter): Dokumentmetadata[] => {
    const { temaer, avsendere, dateRange, saksId } = filters;

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

    if (avsendere?.length) {
        filteredList = filteredList.filter((dok) => avsendere.includes(dok.avsender));
    }

    if (dateRange?.from || dateRange?.to) {
        filteredList = filterByDateRange(filteredList, dateRange);
    }

    return filteredList;
};

export const getTemaDokumentStatistikk = (
    dokumenter: Dokumentmetadata[],
    temaer: Sakstema[],
    filters: DokumenterFilter
): TemaDokumentStatistikk[] => {
    const dokumenterEtterAndreFilter = filterDokumenter(dokumenter, { ...filters, temaer: [] }).toSorted(
        datoSynkende((dok) => dok.dato || new Date(0))
    );
    const temakoderMedDokumenter = new Set(dokumenter.map((dokument) => dokument.temakode));
    const statistikkPerTema = new Map<string, { antallDokumenter: number; nyesteDokumentDato: string | null }>();

    for (const dokument of dokumenterEtterAndreFilter) {
        const statistikk = statistikkPerTema.get(dokument.temakode);
        if (statistikk) {
            statistikk.antallDokumenter += 1;
        } else {
            statistikkPerTema.set(dokument.temakode, {
                antallDokumenter: 1,
                nyesteDokumentDato: dokument.dato
            });
        }
    }

    return temaer
        .filter((tema) => temakoderMedDokumenter.has(tema.temakode))
        .map((tema) => ({
            ...tema,
            antallDokumenter: statistikkPerTema.get(tema.temakode)?.antallDokumenter ?? 0,
            nyesteDokumentDato: statistikkPerTema.get(tema.temakode)?.nyesteDokumentDato ?? null
        }))
        .toSorted((a, b) => {
            if (a.antallDokumenter === 0 && b.antallDokumenter === 0) {
                const valgteFørst =
                    Number(filters.temaer.includes(b.temakode)) - Number(filters.temaer.includes(a.temakode));
                if (valgteFørst !== 0) return valgteFørst;
            }
            if (!a.nyesteDokumentDato && !b.nyesteDokumentDato) {
                return a.temanavn.localeCompare(b.temanavn, 'nb');
            }
            if (!a.nyesteDokumentDato) return 1;
            if (!b.nyesteDokumentDato) return -1;
            return new Date(b.nyesteDokumentDato).getTime() - new Date(a.nyesteDokumentDato).getTime();
        });
};

export const useTemaDokumentStatistikk = () => {
    const filters = useAtomValue(dokumenterFilterAtom);
    const { data } = useSakerDokumenter();
    const dokumenter = data?.dokumenter ?? [];
    const temaer = data?.temaer ?? [];

    return {
        dataLoaded: data !== undefined,
        temaer: useMemo(() => getTemaDokumentStatistikk(dokumenter, temaer, filters), [dokumenter, temaer, filters])
    };
};
