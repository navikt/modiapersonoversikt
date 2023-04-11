import { Varsel, Varseltype } from '../../../../models/varsel';
import { loggError } from '../../../../utils/logger/frontendLogger';

export function getVarselTekst(varsel: Varsel) {
    const varselTekst = Varseltype[varsel.varselType];

    if (!varselTekst) {
        const ukjentNøkkelTekst = 'Ukjent nøkkel: ' + varsel.varselType;
        loggError(Error(ukjentNøkkelTekst));
        return ukjentNøkkelTekst;
    }

    return varselTekst;
}

export function emptyReplacement(text: string | null | undefined, replacement: string): string {
    if (text === null || text === undefined || text === '') {
        return replacement;
    }
    return text;
}
