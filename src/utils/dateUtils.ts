import * as moment from 'moment';

export function formaterDato(rawDate: string): string {
    return moment(rawDate).format('DD.MM.YYYY');
}

export function formaterTilISO8601Date(date: Date) {
    return moment(date).format('YYYY-MM-DD');
}

export function isValidDate(streng: string) {
    const timestamp = Date.parse(streng);
    return !isNaN(timestamp);
}