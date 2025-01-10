import { type Varsel, Varseltype } from '../../../../models/varsel';
import { loggError } from '../../../../utils/logger/frontendLogger';

export function getVarselTekst(varsel: Varsel) {
    const varselTekst = Varseltype[varsel.varselType as keyof typeof Varseltype];

    if (!varselTekst) {
        const ukjentNøkkelTekst = `Ukjent nøkkel: ${varsel.varselType}`;
        loggError(Error(ukjentNøkkelTekst));
        return ukjentNøkkelTekst;
    }

    return varselTekst;
}
