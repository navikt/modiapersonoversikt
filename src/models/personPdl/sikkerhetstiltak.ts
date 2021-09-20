import { SikkerhetstiltakType } from './person';

export interface Sikkerhetstiltak {
    type: SikkerhetstiltakType;
    gyldigFraOgMed: Date;
    gyldigTilOgMed: Date;
}
