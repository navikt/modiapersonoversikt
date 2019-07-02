import { combineReducers } from 'redux';

import innloggetSaksbehandlerReducer from './innloggetSaksbehandler';
import personinformasjonReducer from './personinformasjon';
import navkontorReducer from './navkontor';
import oppgaverReducer from './oppgaver';
import kontaktinformasjonReducer from './kontaktinformasjon';
import egenAnsattReducer from './egenansatt';
import vergemalReducer from './vergemal';
import baseUrlReducer from './baseurls';
import endreNavnReducer from './brukerprofil/endreNavn';
import endrekontonummerReducer from './brukerprofil/endreKontonummer';
import endreTilrettelagtKommunikasjonReducer from './brukerprofil/endreTilrettelagtKommunikasjon';
import veilederRollerReducer from './veilederRoller';
import retningsnummereReducer from './kodeverk/retningsnummereReducer';
import tilrettelagtKommunikasjonKodeverkReducer from './kodeverk/tilrettelagtKommunikasjonReducer';
import endreKontaktinformasjonReducer from './brukerprofil/kontaktinformasjon';
import valutaKodeverkReducer from './kodeverk/valutaKodeverk';
import endreAdresseReducer from './brukerprofil/endreAdresseReducer';
import landKodeverkReducer from './kodeverk/landKodeverk';
import postnummerReducer from './kodeverk/postnummerReducer';
import utbetalingerReducer from './utbetalinger';
import sykepengerReducer from './ytelser/sykepenger';
import pleiepengerReducer from './ytelser/pleiepenger';
import foreldrepengerReducer from './ytelser/foreldrepenger';
import oppfolgingReducer from './oppfolging';
import featureToggleReducer from './featureToggles';
import saksoversiktReducer from './saksoversikt';
import varselReducer from './varsel';
import meldingerReducer from './meldinger/meldinger';
import oppgaveGsakTemaReducer from './meldinger/gsakTema';
import opprettOppgave from './meldinger/opprettOppgave';
import personsok from './personsok';
import merkFeilsendt from './meldinger/merkFeilsendt';
import merkBidrag from './meldinger/merkBidrag';
import merkKontorsperret from './meldinger/merkKontorsperret';
import merkAvslutt from './meldinger/merkAvslutt';
import merkSlett from './meldinger/merkSlett';
import { PersonRespons } from '../../models/person/person';
import { Oppgave } from '../../models/oppgave';
import { BrukersNavKontorResponse } from '../../models/navkontor';
import { KRRKontaktinformasjon } from '../../models/kontaktinformasjon';
import { Egenansatt } from '../../models/egenansatt';
import { Vergemal } from '../../models/vergemal/vergemal';
import { VeilederRoller } from '../../models/veilederRoller';
import { KodeverkResponse } from '../../models/kodeverk';
import { BaseUrlsResponse } from '../../models/baseurls';
import { DeprecatedRestResource } from './deprecatedRestResource';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { SakstemaResponse } from '../../models/saksoversikt/sakstema';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import { Varsel } from '../../models/varsel';
import { SendMeldingRequest, Traad } from '../../models/meldinger/meldinger';
import { PostResource } from '../../rest/utils/postResource';
import sendMelding from './sendMelding';
import { GsakTema, OpprettOppgaveRequest } from '../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../models/innloggetSaksbehandler';
import { PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import {
    AvsluttUtenSvarRequest,
    KontorsperrRequest,
    RequestMedBehandlingskjede,
    RequestMedTraadId
} from '../../models/meldinger/merk';

export interface RestEndepunkter {
    innloggetSaksbehandler: RestResource<InnloggetSaksbehandler>;
    personinformasjon: DeprecatedRestResource<PersonRespons>;
    brukersNavKontor: DeprecatedRestResource<BrukersNavKontorResponse>;
    oppgaver: DeprecatedRestResource<Oppgave[]>;
    kontaktinformasjon: RestResource<KRRKontaktinformasjon>;
    egenAnsatt: RestResource<Egenansatt>;
    vergemal: RestResource<Vergemal>;
    baseUrl: DeprecatedRestResource<BaseUrlsResponse>;
    endreNavn: DeprecatedRestResource<{}>;
    endreKontonummer: DeprecatedRestResource<{}>;
    endreTilrettelagtKommunikasjon: DeprecatedRestResource<{}>;
    veilederRoller: DeprecatedRestResource<VeilederRoller>;
    retningsnummer: DeprecatedRestResource<KodeverkResponse>;
    tilrettelagtKommunikasjonKodeverk: DeprecatedRestResource<KodeverkResponse>;
    endreKontaktinformasjon: DeprecatedRestResource<{}>;
    postnummer: DeprecatedRestResource<KodeverkResponse>;
    endreAdresse: DeprecatedRestResource<{}>;
    valuta: DeprecatedRestResource<KodeverkResponse>;
    land: DeprecatedRestResource<KodeverkResponse>;
    utbetalinger: DeprecatedRestResource<UtbetalingerResponse>;
    sykepenger: RestResource<SykepengerResponse>;
    pleiepenger: RestResource<PleiepengerResponse>;
    foreldrepenger: RestResource<ForeldrepengerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
    sakstema: DeprecatedRestResource<SakstemaResponse>;
    featureToggles: DeprecatedRestResource<FeatureToggles>;
    brukersVarsler: RestResource<Varsel[]>;
    tråderOgMeldinger: RestResource<Traad[]>;
    oppgaveGsakTema: RestResource<GsakTema[]>;
    opprettOppgave: PostResource<OpprettOppgaveRequest>;
    sendMelding: PostResource<SendMeldingRequest>;
    personsok: PostResource<PersonsokRequest, PersonsokResponse[]>;
    merkFeilsendt: PostResource<RequestMedBehandlingskjede>;
    merkBidrag: PostResource<RequestMedTraadId>;
    merkKontorsperret: PostResource<KontorsperrRequest>;
    merkAvslutt: PostResource<AvsluttUtenSvarRequest>;
    merkSlett: PostResource<RequestMedBehandlingskjede>;
}

export default combineReducers<RestEndepunkter>({
    innloggetSaksbehandler: innloggetSaksbehandlerReducer,
    personinformasjon: personinformasjonReducer,
    brukersNavKontor: navkontorReducer,
    oppgaver: oppgaverReducer,
    kontaktinformasjon: kontaktinformasjonReducer,
    egenAnsatt: egenAnsattReducer,
    vergemal: vergemalReducer,
    baseUrl: baseUrlReducer,
    endreKontonummer: endrekontonummerReducer,
    endreNavn: endreNavnReducer,
    endreTilrettelagtKommunikasjon: endreTilrettelagtKommunikasjonReducer,
    veilederRoller: veilederRollerReducer,
    retningsnummer: retningsnummereReducer,
    tilrettelagtKommunikasjonKodeverk: tilrettelagtKommunikasjonKodeverkReducer,
    endreKontaktinformasjon: endreKontaktinformasjonReducer,
    postnummer: postnummerReducer,
    endreAdresse: endreAdresseReducer,
    valuta: valutaKodeverkReducer,
    land: landKodeverkReducer,
    utbetalinger: utbetalingerReducer,
    sykepenger: sykepengerReducer,
    pleiepenger: pleiepengerReducer,
    foreldrepenger: foreldrepengerReducer,
    oppfolging: oppfolgingReducer,
    sakstema: saksoversiktReducer,
    featureToggles: featureToggleReducer,
    brukersVarsler: varselReducer,
    tråderOgMeldinger: meldingerReducer,
    oppgaveGsakTema: oppgaveGsakTemaReducer,
    sendMelding: sendMelding,
    opprettOppgave: opprettOppgave,
    personsok: personsok,
    merkFeilsendt: merkFeilsendt,
    merkBidrag: merkBidrag,
    merkKontorsperret: merkKontorsperret,
    merkAvslutt: merkAvslutt,
    merkSlett: merkSlett
});
