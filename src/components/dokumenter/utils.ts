import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { type DokumenterFilter, dokumenterFilterAtom } from 'src/components/Dokumenter/Filter';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';

export const useFilterDokumenter = (): Dokumentmetadata[] => {
    const filters = useAtomValue(dokumenterFilterAtom);
    const { data } = useSakerDokumenter();
    const dokumenter = data?.dokumenter ?? [];

    const sortedDokumenter = dokumenter.toSorted(datoSynkende((t) => t.dato || new Date(0)));

    return useMemo(() => filterDokumenter(sortedDokumenter, filters), [sortedDokumenter, filters]);
};

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

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((dok) => {
            const dato = dayjs(dok.dato);
            return dato.isSameOrAfter(dateRange.from) && dato.isSameOrBefore(dateRange.to);
        });
    }

    return filteredList;
};
