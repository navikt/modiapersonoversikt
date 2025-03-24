import dayjs from 'dayjs';
import { formaterNOK } from '../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import type { Periode } from '../models/tid';

export const ENDASH = '\u2013';

export function removeWhitespace(input: string) {
    return input.replace(/ /g, '');
}

export function emptyReplacement(text: string | null | undefined, replacement: string): string {
    if (text === null || text === undefined || text === '') {
        return replacement;
    }
    return text;
}

export function erTall(input: string) {
    return !Number.isNaN(Number(input));
}

export function sorterAlfabetisk(a: string, b: string) {
    return a > b ? 1 : -1;
}

export function prosentEllerNull(value: number | null): string | null {
    if (!value) {
        return null;
    }
    return `${value}%`;
}

export function NOKellerNull(value: number | null | undefined): string | null {
    if (!value) {
        return null;
    }
    return `${formaterNOK(value)} NOK`;
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
    return dayjs(rawDate).format('DD.MM.YYYY');
}

export function datoEllerNull(dato: string | Date | null | undefined): string | null {
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
    return `${formaterDato(periode.fra)} - ${periode.til ? formaterDato(periode.til) : ''}`;
}

export function capitalizeName(name: string): string {
    return name.replace(/[\wæøåÆØÅ][^\s'-]*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function capitalizeAfterPunctuation(name: string): string {
    return name.replace(
        /(^|[.!?]\s+)([a-zøæå])/gm,
        (_txt, group1: string, group2: string) => group1 + group2.toUpperCase()
    );
}
