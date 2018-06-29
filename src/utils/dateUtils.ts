import * as moment from 'moment';

export function formaterDato(rawDate: string): string {
    return rawDate ? moment(rawDate).format('DD.MM.YYYY') : 'Ikke angitt';
}

export function formaterTilISO8601Date(date: Date) {
    return moment(date).format('YYYY-MM-DD');
}

export function isValidDate(streng: string) {
    const timestamp = Date.parse(streng);
    return !isNaN(timestamp);
}

export function erImorgenEllerSenere(date: Date) {
    return moment(date).isAfter(new Date(), 'day');
}

export function erMaksEttÅrFramITid(date: Date) {
    const ettÅrFramITid = moment().add(1, 'years');
    return moment(date).isSameOrBefore(ettÅrFramITid);
}