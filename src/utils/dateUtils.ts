import * as moment from 'moment';

export function formaterDato(rawDate: string): string {
    return moment(rawDate).format('DD.MM.YYYY');
}