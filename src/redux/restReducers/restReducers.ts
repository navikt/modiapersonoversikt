import innloggetSaksbehandlerReducer from './innloggetSaksbehandler';
import tilgangskontrollReducer from './tilgangskontroll';
import personinformasjonReducer from './personinformasjon';
import navkontorReducer from './navkontor';
import kontaktinformasjonReducer from './kontaktinformasjon';
import egenAnsattReducer from './egenansatt';
import baseUrlReducer from './baseurls';
import veilederRollerReducer from './veilederRoller';
import retningsnummereReducer from './kodeverk/retningsnummereReducer';
import tilrettelagtKommunikasjonKodeverkReducer from './kodeverk/tilrettelagtKommunikasjonReducer';
import valutaKodeverkReducer from './kodeverk/valutaKodeverk';
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
import { PersonRespons } from '../../models/person/person';
import { NavKontorResponse } from '../../models/navkontor';
import { KRRKontaktinformasjon } from '../../models/kontaktinformasjon';
import { Egenansatt } from '../../models/egenansatt';
import { VeilederRoller } from '../../models/veilederRoller';
import { KodeverkResponse } from '../../models/kodeverk';
import { BaseUrlsResponse } from '../../models/baseurls';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { SakstemaResponse } from '../../models/saksoversikt/sakstema';
import { Varsel } from '../../models/varsel';
import { Traad } from '../../models/meldinger/meldinger';
import { GsakTema, Oppgave } from '../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../models/innloggetSaksbehandler';
import tildelteOppgaver from './tildelteOppgaver';
import { combineResettableReducers } from '../reducer-utils';
import utbetalingerOversikt from './utbetalingerOversikt';
import saksbehandlersEnheter from './saksbehandlersEnheter';
import { SaksbehandlersEnheter } from '../../models/saksbehandlersEnheter';
import { TilgangDTO } from './tilgangskontroll';

export interface RestEndepunkter {
    innloggetSaksbehandler: RestResource<InnloggetSaksbehandler>; // TODO denne kan fjernes, eller evt erstattes med kall til modiacontextholder
    saksbehandlersEnheter: RestResource<SaksbehandlersEnheter>; // TODO denne bør fjernes, eller evt erstattes med kall til modiacontextholder
    tilgangskontroll: RestResource<TilgangDTO>;
    personinformasjon: RestResource<PersonRespons>;
    brukersNavKontor: RestResource<NavKontorResponse>;
    tildelteOppgaver: RestResource<Oppgave[]>;
    kontaktinformasjon: RestResource<KRRKontaktinformasjon>;
    egenAnsatt: RestResource<Egenansatt>;
    baseUrl: RestResource<BaseUrlsResponse>;
    veilederRoller: RestResource<VeilederRoller>;
    retningsnummer: RestResource<KodeverkResponse>;
    tilrettelagtKommunikasjonKodeverk: RestResource<KodeverkResponse>;
    postnummer: RestResource<KodeverkResponse>;
    valuta: RestResource<KodeverkResponse>;
    land: RestResource<KodeverkResponse>;
    utbetalinger: RestResource<UtbetalingerResponse>;
    utbetalingerOversikt: RestResource<UtbetalingerResponse>;
    sykepenger: RestResource<SykepengerResponse>;
    pleiepenger: RestResource<PleiepengerResponse>;
    foreldrepenger: RestResource<ForeldrepengerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
    sakstema: RestResource<SakstemaResponse>;
    featureToggles: RestResource<{ [name: string]: boolean }>;
    brukersVarsler: RestResource<Varsel[]>;
    traader: RestResource<Traad[]>;
    oppgaveGsakTema: RestResource<GsakTema[]>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        innloggetSaksbehandler: innloggetSaksbehandlerReducer,
        tilgangskontroll: tilgangskontrollReducer,
        saksbehandlersEnheter: saksbehandlersEnheter,
        personinformasjon: personinformasjonReducer,
        brukersNavKontor: navkontorReducer,
        tildelteOppgaver: tildelteOppgaver,
        kontaktinformasjon: kontaktinformasjonReducer,
        egenAnsatt: egenAnsattReducer,
        baseUrl: baseUrlReducer,
        veilederRoller: veilederRollerReducer,
        retningsnummer: retningsnummereReducer,
        tilrettelagtKommunikasjonKodeverk: tilrettelagtKommunikasjonKodeverkReducer,
        postnummer: postnummerReducer,
        valuta: valutaKodeverkReducer,
        land: landKodeverkReducer,
        utbetalinger: utbetalingerReducer,
        utbetalingerOversikt: utbetalingerOversikt,
        sykepenger: sykepengerReducer,
        pleiepenger: pleiepengerReducer,
        foreldrepenger: foreldrepengerReducer,
        oppfolging: oppfolgingReducer,
        sakstema: saksoversiktReducer,
        featureToggles: featureToggleReducer,
        brukersVarsler: varselReducer,
        traader: meldingerReducer,
        oppgaveGsakTema: oppgaveGsakTemaReducer
    },
    [
        'innloggetSaksbehandler',
        'veilederRoller',
        'baseUrl',
        'postnummer',
        'valuta',
        'land',
        'featureToggles',
        'saksbehandlersEnheter'
    ]
);
