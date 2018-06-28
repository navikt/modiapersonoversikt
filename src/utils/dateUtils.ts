import * as moment from 'moment';

export function formaterDato(rawDate: string): string {
    return rawDate ? moment(rawDate).format('DD.MM.YYYY') : 'Ikke angitt';
}

export function formaterTilISO8601Date(date: Date) {
    return moment(date).format('YYYY-MM-DD');
}
