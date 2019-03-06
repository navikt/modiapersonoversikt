import { Periode } from '../models/periode';
import { formaterDato } from '../utils/dateUtils';
import { formaterNOK } from '../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';

export function convertBoolTilJaNei(verdi: boolean | null): string | null {
    switch (verdi) {
        case true:
            return 'Ja';
        case false:
            return 'Nei';
        default:
            return null;
    }
}

export function prosentEllerNull(value: number | null): string | null {
    if (!value) {
        return null;
    }
    return value + '%';
}

export function periodeEllerNull(periode: Periode | null): string | null {
    if (!periode) {
        return null;
    }
    return `${formaterDato(periode.fra)} - ${formaterDato(periode.til)}`;
}

export function datoEllerNull(dato: string | Date | null): string | null {
    if (!dato) {
        return null;
    }
    return formaterDato(dato);
}

export function NOKellerNull(value: number | null): string | null {
    if (!value) {
        return null;
    }
    return formaterNOK(value) + ' NOK';
}
