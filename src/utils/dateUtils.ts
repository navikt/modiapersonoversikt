import * as moment from 'moment';
import navfaker from 'nav-faker';

export function formaterDato(rawDate: string | Date): string {
    return moment(rawDate).format('DD.MM.YYYY');
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

export function getAlderFromFødselsnummer(fødselsnummer: string) {
    return moment().diff(navfaker.personIdentifikator.getFødselsdato(fødselsnummer), 'years');
}

export function dateComparator (a: Date, b: Date) {
    return a > b ? 1 : -1;
}
