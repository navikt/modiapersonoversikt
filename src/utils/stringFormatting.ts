import { formaterNOK } from '../app/personside/infotabs/utbetalinger/utils/utbetalingerUtils';
import { Periode } from '../models/periode';
import moment from 'moment';

export function prosentEllerNull(value: number | null): string | null {
    if (!value) {
        return null;
    }
    return value + '%';
}

export function NOKellerNull(value: number | null): string | null {
    if (!value) {
        return null;
    }
    return formaterNOK(value) + ' NOK';
}

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

export function formatNumber(format: string, streng: string) {
    let result = '';

    let strengIndex = 0;
    for (let i = 0; i < format.length; i++) {
        if (streng[strengIndex] === undefined) {
            break;
        }
        if (format[i] === '#') {
            result += streng[strengIndex++];
        } else {
            result += format[i];
        }
    }

    return result;
}

export function formaterDato(rawDate: string | Date): string {
    return moment(rawDate).format('DD.MM.YYYY');
}

export function datoEllerNull(dato: string | Date | null): string | null {
    if (!dato) {
        return null;
    }
    return formaterDato(dato);
}

export function datoEllerTomString(dato: string | Date | null): string {
    if (!dato) {
        return '';
    }
    return formaterDato(dato);
}

export function periodeEllerNull(periode: Periode | null): string | null {
    if (!periode) {
        return null;
    }
    return `${formaterDato(periode.fra)} - ${formaterDato(periode.til)}`;
}

export function formaterTilISO8601Date(date: Date) {
    return moment(date).format('YYYY-MM-DD');
}

export function capitalizeName(name: string): string {
    return name.replace(/\w[^\s'-]*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
