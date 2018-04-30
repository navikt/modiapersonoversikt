import { Periode } from './periode';

export interface Sikkerhetstiltak {
    sikkerhetstiltaksbeskrivelse: string;
    sikkerhetstiltakskode: SikkerhetstiltakTyper;
    periode?: Periode;
}

export enum SikkerhetstiltakTyper {
    FysiskUtestengelse = 'FYUS',
    FysiskOgTelefonUtestengelse = 'FTUS',
    ToAnsatteSamtale = 'TOAN'
}