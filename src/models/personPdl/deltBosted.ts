import { Adresse } from './person';

export interface DeltBosted {
    startdatoForKontrakt: Date;
    sluttdatoForKontrakt: Date | null;
    adresse: Adresse | null;
}
