import { combineReducers } from 'redux';

import personinformasjonReducer from './personinformasjon';
import navkontorReducer from './navkontor';
import oppgaverReducer from './oppgaver';
import kontaktinformasjonReducer from './kontaktinformasjon';
import egenAnsattReducer from './egenansatt';
import vergemalReducer from './vergemal';
import baseUrlReducer from './baseurls';
import endreNavnReducer from './brukerprofil/endreNavn';
import endrekontonummer from './brukerprofil/endreKontonummer';
import endreTilrettelagtKommunikasjonReducer from './brukerprofil/endreTilrettelagtKommunikasjon';
import veilederRollerReducer from './veilederRoller';
import retningsnummereReducer from './kodeverk/retningsnummereReducer';
import tilrettelagtKommunikasjonKodeverkReducer from './kodeverk/tilrettelagtKommunikasjonReducer';
import endreKontaktinformasjonReducer from './brukerprofil/kontaktinformasjon';
import valutaKodeverkReducer from './kodeverk/valutaKodeverk';
import endreAdresseReducer from './brukerprofil/endreAdresseReducer';
import landKodeverkReducer from './kodeverk/landKodeverk';
import postnummerReducer from './kodeverk/postnummerReducer';
import { STATUS } from './utils';
import { PersonRespons } from '../models/person/person';
import { Oppgave } from '../models/oppgave';
import { BrukersNavKontorResponse } from '../models/navkontor';
import { Kontaktinformasjon } from '../models/kontaktinformasjon';
import { Egenansatt } from '../models/egenansatt';
import { Vergemal } from '../models/vergemal/vergemal';
import { VeilederRoller } from '../models/veilederRoller';
import { KodeverkResponse } from '../models/kodeverk';
import { BaseUrlsResponse } from '../models/baseurls';

export interface AppState {
    personinformasjon: RestReducer<PersonRespons>;
    brukersNavKontor: RestReducer<BrukersNavKontorResponse>;
    oppgaver: RestReducer<Oppgave[]>;
    kontaktinformasjon: RestReducer<Kontaktinformasjon>;
    egenAnsatt: RestReducer<Egenansatt>;
    vergemal: RestReducer<Vergemal>;
    baseUrlReducer: RestReducer<BaseUrlsResponse>;
    endreNavn: RestReducer<{}>;
    endreKontonummer: RestReducer<{}>;
    endreTilrettelagtKommunikasjon: RestReducer<{}>;
    veilederRoller: RestReducer<VeilederRoller>;
    retningsnummerReducer: RestReducer<KodeverkResponse>;
    tilrettelagtKommunikasjonKodeverk: RestReducer<KodeverkResponse>;
    endreKontaktinformasjonReducer: RestReducer<{}>;
    postnummerReducer: RestReducer<KodeverkResponse>;
    endreAdresseReducer: RestReducer<{}>;
    valutaReducer: RestReducer<KodeverkResponse>;
    landReducer: RestReducer<KodeverkResponse>;
}

export default combineReducers<AppState>({
    personinformasjon: personinformasjonReducer,
    brukersNavKontor: navkontorReducer,
    oppgaver: oppgaverReducer,
    kontaktinformasjon: kontaktinformasjonReducer,
    egenAnsatt: egenAnsattReducer,
    vergemal: vergemalReducer,
    baseUrlReducer: baseUrlReducer,
    endreKontonummer: endrekontonummer,
    endreNavn: endreNavnReducer,
    endreTilrettelagtKommunikasjon: endreTilrettelagtKommunikasjonReducer,
    veilederRoller: veilederRollerReducer,
    retningsnummerReducer: retningsnummereReducer,
    tilrettelagtKommunikasjonKodeverk: tilrettelagtKommunikasjonKodeverkReducer,
    endreKontaktinformasjonReducer: endreKontaktinformasjonReducer,
    postnummerReducer: postnummerReducer,
    endreAdresseReducer,
    valutaReducer: valutaKodeverkReducer,
    landReducer: landKodeverkReducer
});

export interface RestReducer<T> {
    status: STATUS;
    data: T;
    error?: String;
}
