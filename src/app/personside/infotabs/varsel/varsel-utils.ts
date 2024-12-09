import { type Varsel, Varseltype } from '../../../../models/varsel';
import { loggError } from '../../../../utils/logger/frontendLogger';

export function getVarselTekst(varsel: Varsel) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const varselTekst = Varseltype[varsel.varselType];

    if (!varselTekst) {
        const ukjentNøkkelTekst = `Ukjent nøkkel: ${varsel.varselType}`;
        loggError(Error(ukjentNøkkelTekst));
        return ukjentNøkkelTekst;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return varselTekst;
}

export function emptyReplacement(text: string | null | undefined, replacement: string): string {
    if (text === null || text === undefined || text === '') {
        return replacement;
    }
    return text;
}
