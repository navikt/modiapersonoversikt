import dayjs from 'dayjs';
import { backendDatoformat } from 'src/utils/date-utils';

export type PensjonResource = Pensjon[] | null;

export interface Pensjon {
    sakid: number;
    enhetsId: string;
    sakType: string;
    sakStatus: string;
    fomDato?: string;
    tomDato?: string;
}

export function getPensjonIdDato(ytelse: Pensjon) {
    return ytelse.fomDato ?? dayjs().format(backendDatoformat);
}

export function getUnikPensjonKey(ytelse: Pensjon) {
    return `pensjon${ytelse.sakid}`;
}
