import { Navn } from './person';

export interface Fullmakt {
    motpartsPersonident: string;
    motpartsPersonNavn: Navn;
    motpartsRolle: FullmaktsRolle;
    omraade: string[];
    gyldigFraOgMed: Date;
    gyldigTilOgMed: Date;
}

export enum FullmaktsRolle {
    Fullmaktsgiver = 'FULLMAKTSGIVER',
    Fullmektig = 'FULLMEKTIG',
    Ukjent = 'UKJENT'
}
