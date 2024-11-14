import { Periode } from './tid';

export interface Sikkerhetstiltak {
    sikkerhetstiltaksbeskrivelse: string;
    sikkerhetstiltakskode: string;
    periode?: Periode;
}
