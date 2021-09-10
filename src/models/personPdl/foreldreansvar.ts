import { Navn } from './person';

export interface Foreldreansvar {
    ansvar: string;
    ansvarlig: Navn | null;
    ansvarsubject: Navn | null;
}
