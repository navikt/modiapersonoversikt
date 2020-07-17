import { Periode } from './tid';

export interface Sikkerhetstiltak {
    sikkerhetstiltaksbeskrivelse: string;
    sikkerhetstiltakskode: string;
    periode?: Periode;
}

export enum SikkerhetstiltakTyper {
    FysiskUtestengelse = 'FYUS',
    FysiskOgTelefonUtestengelse = 'FTUS',
    ToAnsatteSamtale = 'TOAN',
    EgenAnsatt = 'EGAN'
}
