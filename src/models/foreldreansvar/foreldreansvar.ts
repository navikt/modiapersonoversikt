import { Navn } from '../person/person';

export interface Foreldreansvar {
    ansvar: string;
    ansvarlig?: Navn;
    ansvarssubjekt?: Navn;
}
