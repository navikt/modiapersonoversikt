import { combineReducers } from 'redux';

import personinformasjonReducer from './personinformasjon';
import navkontorReducer from './navkontor';
import oppgaverReducer from './oppgaver';
import kontaktinformasjonReducer from './kontaktinformasjon';
import egenAnsattReducer from './egenansatt';
import vergemalReducer from './vergemal';
import baseUrlReducer from './baseurls';
import endreNavnReducer from './brukerprofil/endreNavn';
import endreTilrettelagtKommunikasjonReducer from './brukerprofil/endreTilrettelagtKommunikasjon';
import veilederRollerReducer from './veilederRoller';
import retningsnummereReducer from './kodeverk/retningsnummereReducer';
import tilrettelagtKommunikasjonKodeverkReducer from './kodeverk/tilrettelagtKommunikasjonReducer';
import endreKontaktinformasjonReducer from './brukerprofil/kontaktinformasjon';
import endreAdresseReducer from './brukerprofil/endreAdresseReducer';
import postnummerReducer from './kodeverk/postnummerReducer';
import { STATUS } from './utils';
import { PersonRespons } from '../models/person/person';
import { Oppgave } from '../models/oppgave';
import { NavKontor } from '../models/navkontor';
import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { Egenansatt } from '../models/egenansatt';
import { Vergemal } from '../models/vergemal/vergemal';
import { VeilederRoller } from '../models/veilederRoller';
import { KodeverkResponse } from '../models/kodeverk';
import { BaseUrlsResponse } from '../models/baseurls';

export interface AppState {
    personinformasjon: Reducer<PersonRespons>;
    brukersNavKontor: Reducer<NavKontor>;
    oppgaver: Reducer<Oppgave[]>;
    kontaktinformasjon: Reducer<Kontaktinformasjon>;
    egenAnsatt: Reducer<Egenansatt>;
    vergemal: Reducer<Vergemal>;
    baseUrlReducer: Reducer<BaseUrlsResponse>;
    endreNavn: Reducer<{}>;
    endreTilrettelagtKommunikasjon: Reducer<{}>;
    veilederRoller: Reducer<VeilederRoller>;
    retningsnummerReducer: Reducer<KodeverkResponse>;
    tilrettelagtKommunikasjonKodeverk: Reducer<KodeverkResponse>;
    endreKontaktinformasjonReducer: Reducer<{}>;
    postnummerReducer: Reducer<KodeverkResponse>;
    endreAdresseReducer: Reducer<{}>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    brukersNavKontor: navkontorReducer,
    oppgaver: oppgaverReducer,
    kontaktinformasjon: kontaktinformasjonReducer,
    egenAnsatt: egenAnsattReducer,
    vergemal: vergemalReducer,
    baseUrlReducer: baseUrlReducer,
    endreNavn: endreNavnReducer,
    endreTilrettelagtKommunikasjon: endreTilrettelagtKommunikasjonReducer,
    veilederRoller: veilederRollerReducer,
    retningsnummerReducer: retningsnummereReducer,
    tilrettelagtKommunikasjonKodeverk: tilrettelagtKommunikasjonKodeverkReducer,
    endreKontaktinformasjonReducer: endreKontaktinformasjonReducer,
    postnummerReducer: postnummerReducer,
    endreAdresseReducer
});

export interface Reducer<T> {
    status: STATUS;
    data?: T;
    error?: String;
}
