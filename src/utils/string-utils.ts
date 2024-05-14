import { formaterNOK } from '../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import dayjs from 'dayjs';
import { Periode } from '../models/tid';

export const ENDASH = '\u2013';

export function removeWhitespace(input: string) {
    return input.replace(/ /g, '');
}

export function erTall(input: string) {
    return !isNaN(Number(input));
}

export function sorterAlfabetisk(a: string, b: string) {
    return a > b ? 1 : -1;
}

export function removePrefix(base: string, ...prefixes: string[]): string {
    return prefixes.reduce((current, prefix) => {
        const match = prefix.match(/(.*)\//);
        let normalizedPrefix = prefix;
        if (match) normalizedPrefix = match[1];
        if (current.startsWith(normalizedPrefix)) {
            return current.slice(normalizedPrefix.length);
        }
        return current;
    }, base);
}

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
    return dayjs(rawDate).format('DD.MM.YYYY');
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
    return `${formaterDato(periode.fra)} - ${periode.til ? formaterDato(periode.til) : ''}`;
}

export function formaterTilISO8601Date(date: Date) {
    return dayjs(date).format('YYYY-MM-DD');
}

export function capitalizeName(name: string): string {
    return name.replace(/[\wæøåÆØÅ][^\s'-]*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function capitalizeAfterPunctuation(name: string): string {
    return name.replace(
        /(^|[.!?]\s+)([a-zøæå])/gm,
        (txt, group1: string, group2: string) => group1 + group2.toUpperCase()
    );
}

export function captitalize(content: string): string {
    return content.split('\n').map(capitalizeAfterPunctuation).join('\n');
}
