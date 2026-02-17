import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
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

interface Returns {
    varsler: VarselData[];
    isLoading: boolean;
    errorMessages: (string | undefined)[];
    isError: boolean;
}

export const useFilterVarsler = (): Returns => {
    const varselResponse = useVarslerData();

    const varslerResult = varselResponse?.data ?? {
        feil: [],
        varsler: []
    };
    const varselElementer = varslerResult.varsler
        .sort(datoSynkende((v) => v.forstBehandlet))
        .map((item) => dataExtractor(item));

    const errorMessages = [errorPlaceholder(varselResponse, responseErrorMessage('varsler'))];

    return {
        varsler: varselElementer ?? [],
        isLoading: varselResponse.isLoading,
        errorMessages: errorMessages.filter(Boolean),
        isError: varselResponse.isError
    };
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
