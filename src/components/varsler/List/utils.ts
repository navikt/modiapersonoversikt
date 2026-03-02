import { errorPlaceholder, responseErrorMessage } from 'src/components/ytelser/utils';
import { useVarslerData } from 'src/lib/clients/modiapersonoversikt-api';
import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { ENDASH, emptyReplacement } from 'src/utils/string-utils';

export interface VarselData {
    eventId: string;
    aktiv: boolean;
    datoer: string[];
    varslingstidspunkt: string;
    revarslingstidspunkt: string;
    kanaler: string[];
    tittel: string;
    produsent: string;
    harFeiledeVarsler?: boolean;
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
    const varselElementer = varslerResult.varsler.map((item) => dataExtractor(item));

    const errorMessages = [errorPlaceholder(varselResponse, responseErrorMessage('varsler'))];

    return {
        varsler: varselElementer ?? [],
        isLoading: varselResponse.isLoading,
        errorMessages: errorMessages.filter(Boolean),
        isError: varselResponse.isError
    };
};

const dataExtractor = (varsel: Varsel): VarselData => {
    const eksternVarsling = varsel.eksternVarsling;
    const aktiv = varsel.aktiv;
    const eventId = varsel.varselId;
    const tittel = `${varsel.innhold.tekst}`;
    const produsent = emptyReplacement(varsel.produsent, ENDASH);
    const datoer = [eksternVarsling.sendtTidspunkt];
    const kanaler = ['DITT_NAV', ...eksternVarsling.sendteKanaler];

    if (eksternVarsling.renotifikasjonTidspunkt != null) {
        datoer.unshift(eksternVarsling.renotifikasjonTidspunkt);
    }

    const harFeiledeVarsler = eksternVarsling.feilhistorikk.length > 0;

    return {
        eventId,
        aktiv,
        datoer,
        varslingstidspunkt: eksternVarsling.sendtTidspunkt,
        revarslingstidspunkt: eksternVarsling.renotifikasjonTidspunkt ?? '',
        kanaler,
        tittel,
        produsent,
        harFeiledeVarsler,
        event: varsel
    };
};
