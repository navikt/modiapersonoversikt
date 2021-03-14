import { Navn } from '../person/person';

export interface Foreldreansvar {
    ansvar: string;
    ansvarlig: Navn;
    ansvarligUtenIdentifikator: RelatertBiPerson;
}

export interface RelatertBiPerson {
    navn?: Navn;
    foedselsdato: string;
    statsborgerskap?: string;
    kjoenn?: string;
}
