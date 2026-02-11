import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { type DokumenterFilter, dokumenterFilterAtom } from 'src/components/Dokumenter/Filter';
import { errorPlaceholder, type QueryResult, responseErrorMessage } from 'src/components/ytelser/utils';
import type { Dokumentmetadata, ResultatSaksDokumenter } from 'src/generated/modiapersonoversikt-api';
import { useSakerDokumenter } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';

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
