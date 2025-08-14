import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { apiBaseUri } from 'src/api/config';
import type { SakerFilter } from 'src/components/saker/List/Filter';
import { sakerFilterAtom } from 'src/components/saker/List/Filter';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import type {
    Dokument,
    Dokumentmetadata,
    Journalpost,
    Sak,
    SaksDokumenter,
    Sakstema
} from 'src/lib/types/modiapersonoversikt-api';
import {
    DokumentmetadataAvsender,
    DokumentmetadataMottaker,
    DokumentmetadataRetning
} from 'src/lib/types/modiapersonoversikt-api';
import { Feilmelding } from 'src/models/saksoversikt/journalpost';
import { datoSynkende } from 'src/utils/date-utils';
import { parseQueryString } from 'src/utils/url-utils';

export const filterSaker = (saker: SaksDokumenter[], filters: SakerFilter): Sak[] => {
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
            return dato.isAfter(dateRange.from) && dato.isBefore(dateRange.to);
        });
    }

    return filteredList;
};

export const filterDokumenter = (dokumenter: Dokumentmetadata[], filters: SakerFilter): Sak[] => {
    const { avsender, dateRange } = filters;

    if (!dokumenter || dokumenter.length === 0) {
        return [];
    }

    let filteredList = dokumenter;
    if (avsender?.length) {
        filteredList = filteredList.filter((dokument) => avsender.includes(dokument.avsender));
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((dokument) => {
            const dato = dayjs(dokument.opprettet);
            return dato.isAfter(dateRange.from) && dato.isBefore(dateRange.to);
        });
    }

    return filteredList;
};

export const useFilterSaker = () => {
    const filters = useAtomValue(sakerFilterAtom);
    const { data } = useSakerDokumenter();
    const saker = data?.saker ?? [];

    const sortedSaker = saker.toSorted(datoSynkende((t) => t.opprettet));

    return useMemo(() => filterSaker(sortedSaker, filters), [sortedSaker, filters]);
};

export const useTemaer = () => {
    const { data } = useSakerDokumenter();
    const temaer = data?.temaer ?? [];

    return useMemo(() => temaer, [temaer]);
};

export const useFeilendeSystemer = () => {
    const { data } = useSakerDokumenter();
    const feilendeSystemer = data?.feilendeSystemer ?? [];

    return useMemo(() => feilendeSystemer, [feilendeSystemer]);
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

export const getSakId = (sak: Sak) => `${sak.temakode}-${sak.saksid}`;

export const sakerAvsender = [Object.values(DokumentmetadataAvsender)];
export const sakStatusAapen = 'åpen';
export const sakStatusAvsluttet = 'avsluttett';
export const sakStatuser = [sakStatusAapen, sakStatusAvsluttet];
export const sakstemakodeAlle = 'ALLE';

export const constructNorg2FrontendLink = (
    baseUrl: string,
    valgtSakstema?: Sakstema,
    geografiskTilknytning?: string
): string => {
    const temaQuery = valgtSakstema ? buildTemaQueryForNorg(valgtSakstema) : '';
    return `${baseUrl}/#/startsok?tema=${temaQuery}&gt=${geografiskTilknytning || ''}`;
};

export const buildTemaQueryForNorg = (sakstema: Sakstema): string => {
    if (sakstema.temakode !== sakstemakodeAlle) {
        return sakstema.temakode;
    }

    const uniqueTemakodes = sakstema.dokumentMetadata.reduce((acc: string[], journal: Journalpost) => {
        if (!acc.includes(journal.temakode)) {
            acc.push(journal.temakode);
        }
        return acc;
    }, []);

    return uniqueTemakodes.join(',');
};

export const dokumentKanVises = (journalpost: Dokumentmetadata, dokument: Dokument) => {
    return dokument.kanVises && harTilgangTilJournalpost(journalpost);
};

export const harTilgangTilJournalpost = (journalpost: Dokumentmetadata) => {
    const saksid = journalpost.tilhorendeFagsaksid || journalpost.tilhorendeSaksid || '';
    return journalpost.feil?.feilmelding !== Feilmelding.Sikkerhetsbegrensning && saksid.length !== 0;
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
