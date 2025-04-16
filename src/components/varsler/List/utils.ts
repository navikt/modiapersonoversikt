import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import { useMemo } from 'react';
import type { VarslerFilter, VarslerKanal } from 'src/components/varsler/List/Filter';
import { varslerFilterAtom } from 'src/components/varsler/List/Filter';
import { useVarslerData } from 'src/lib/clients/modiapersonoversikt-api';
import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';

export interface VarselData {
    eventId: string;
    datoer: string[];
    kanaler: string[];
    sisteDato: string;
    tittel: string;
    harFeilteVarsel?: boolean;
    erVarslerV2: boolean;
    event: Varsel;
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
        filteredList = filteredList.filter((varsel) => varsel.harFeilteVarsel);
    }

    if (dateRange?.from && dateRange?.to) {
        filteredList = filteredList.filter((varsel) => {
            const datoer = varsel.datoer.map((dato) => dayjs(dato));
            return datoer.some((dato) => dato.isAfter(dateRange.from) && dato.isBefore(dateRange.to));
        });
    }

    return filteredList ?? [];
};

export const useFilterVarsler = () => {
    const filters = useAtomValue(varslerFilterAtom);
    const { data } = useVarslerData();
    const varslerResult = data || {
        feil: [],
        varsler: []
    };

    const varselElementer = varslerResult.varsler
        .sort(datoSynkende((v) => v.forstBehandlet))
        .map((item) => dataExtractor(item));

    return useMemo(() => filterVarsler(varselElementer, filters), [varselElementer, filters]);
};

const dataExtractor = (varsel: Varsel): VarselData => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;
    const eventId = varsel.eventId;
    if (!varslingsTidspunkt || !varslingsTidspunkt.tidspunkt) {
        const datoer = [varsel.forstBehandlet];
        const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];
        return { eventId, datoer, kanaler, tittel, sisteDato: datoer[0], erVarslerV2: false, event: varsel };
    }

    const datoer = [varslingsTidspunkt.tidspunkt];
    if (varslingsTidspunkt.renotifikasjonTidspunkt) {
        datoer.unshift(varslingsTidspunkt.renotifikasjonTidspunkt);
    }
    const kanaler = [
        'DITT_NAV',
        ...varsel.eksternVarslingKanaler,
        ...varslingsTidspunkt.renotifikasjonsKanaler
    ].unique();

    const harFeilteVarsel = varslingsTidspunkt.harFeilteVarslinger || varslingsTidspunkt.harFeilteRevarslinger;

    return {
        eventId,
        datoer,
        kanaler,
        tittel,
        sisteDato: datoer[0],
        harFeilteVarsel,
        erVarslerV2: true,
        event: varsel
    };
};
