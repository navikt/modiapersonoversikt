import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import type { VarslerFilter, VarslerKanal } from 'src/components/varsler/List/Filter';
import { varslerFilterAtom } from 'src/components/varsler/List/Filter';
import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import { useVarslerData } from 'src/lib/clients/modiapersonoversikt-api';
import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';

export interface VarselData {
    eventId: string;
    datoer: string[];
    varslingstidspunkt: string;
    revarslingstidspunkt: string;
    kanaler: string[];
    tittel: string;
    harFeiledeVarsler?: boolean;
    event: Varsel;
}

interface Returns {
    varsler: VarselData[];
    isLoading: boolean;
    errorMessages: (string | undefined)[];
    isError: boolean;
}

const filterVarsler = (varsler: VarselData[], filters: VarslerFilter): VarselData[] => {
    const { kanaler, failedVarslerOnly, dateRange } = filters;

    if (!varsler || varsler.length === 0) {
        return [];
    }
    let filteredList = varsler;
    if (kanaler?.length > 0) {
        filteredList = filteredList.filter((varsel) => {
            return varsel.kanaler.some((kanal) => kanaler.includes(kanal as VarslerKanal));
        });
    }

    if (failedVarslerOnly) {
        filteredList = filteredList.filter((varsel) => varsel.harFeiledeVarsler);
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((varsel) => {
            const datoer = varsel.datoer.map((dato) => dayjs(dato));
            return datoer.some(
                (dato) =>
                    dato.isSameOrAfter(dateRange.from.startOf('day')) && dato.isSameOrBefore(dateRange.to.endOf('day'))
            );
        });
    }

    return filteredList ?? [];
};

export const useFilterVarsler = (): Returns => {
    const filters = useAtomValue(varslerFilterAtom);
    const varselResponse = useVarslerData();

    const varslerResult = varselResponse?.data ?? {
        feil: [],
        varsler: []
    };
    const varselElementer = varslerResult.varsler.map((item) => dataExtractor(item));

    const errorMessages = [errorPlaceholder(varselResponse, responseErrorMessage('varsler'))];

    return {
        varsler: filterVarsler(varselElementer, filters) ?? [],
        isLoading: varselResponse.isLoading,
        errorMessages: errorMessages.filter(Boolean),
        isError: varselResponse.isError
    };
};

const dataExtractor = (varsel: Varsel): VarselData => {
    const eksternVarsling = varsel.eksternVarsling;
    const eventId = varsel.varselId;
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const tittel = `Notifikasjon${aktiv}: ${varsel.innhold.tekst}`;
    const datoer = [eksternVarsling.sendtTidspunkt];
    const kanaler = ['DITT_NAV', ...eksternVarsling.sendteKanaler];

    if (eksternVarsling.renotifikasjonTidspunkt != null) {
        datoer.unshift(eksternVarsling.renotifikasjonTidspunkt);
    }

    const harFeiledeVarsler = eksternVarsling.feilhistorikk.length > 0;

    return {
        eventId,
        datoer,
        varslingstidspunkt: eksternVarsling.sendtTidspunkt,
        revarslingstidspunkt: eksternVarsling.renotifikasjonTidspunkt ?? '',
        kanaler,
        tittel,
        harFeiledeVarsler,
        event: varsel
    };
};
