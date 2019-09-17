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
import { PersonRespons } from '../../models/person/person';
import { LeggTilbakeOppgaveRequest, Oppgave } from '../../models/oppgave';
import { NavKontorResponse } from '../../models/navkontor';
import { KRRKontaktinformasjon } from '../../models/kontaktinformasjon';
import { Egenansatt } from '../../models/egenansatt';
import { Vergemal } from '../../models/vergemal/vergemal';
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
import { SendReferatRequest, SendSpørsmålRequest, ForsettDialogRequest, Traad } from '../../models/meldinger/meldinger';
import { PostResource } from '../../rest/utils/postResource';
import sendReferat from './sendReferat';
import { GsakTema, OpprettOppgaveRequest } from '../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../models/innloggetSaksbehandler';
import { PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import { EndreNavnRequest } from './brukerprofil/endreNavnRequest';
import { EndreKontonummerRequest } from './brukerprofil/endreKontonummerRequest';
import { EndreTilrettelagtKommunikasjonrequest } from './brukerprofil/endreTilrettelagtKommunikasjonrequest';
import { EndreKontaktinformasjonRequest } from './brukerprofil/endreKontaktinformasjonRequest';
import { EndreAdresseRequest } from './brukerprofil/adresse-api';
import sendSpørsmål from './sendSpørsmål';
import leggTilbakeOppgave from './leggTilbakeOppgave';
import sendSvar from './sendSvar';
import tildelteOppgaver from './tildelteOppgaver';
import { combineResettableReducers } from '../reducer-utils';

export interface RestEndepunkter {
    innloggetSaksbehandler: RestResource<InnloggetSaksbehandler>;
    personinformasjon: RestResource<PersonRespons>;
    brukersNavKontor: RestResource<NavKontorResponse>;
    oppgaver: PostResource<{}, Oppgave[]>;
    tildDelteOppgaver: RestResource<Oppgave[]>;
    leggTilbakeOppgave: PostResource<LeggTilbakeOppgaveRequest>;
    kontaktinformasjon: RestResource<KRRKontaktinformasjon>;
    egenAnsatt: RestResource<Egenansatt>;
    vergemal: RestResource<Vergemal>;
    baseUrl: RestResource<BaseUrlsResponse>;
    endreNavn: PostResource<EndreNavnRequest>;
    endreKontonummer: PostResource<EndreKontonummerRequest>;
    endreTilrettelagtKommunikasjon: PostResource<EndreTilrettelagtKommunikasjonrequest>;
    veilederRoller: RestResource<VeilederRoller>;
    retningsnummer: RestResource<KodeverkResponse>;
    tilrettelagtKommunikasjonKodeverk: RestResource<KodeverkResponse>;
    endreKontaktinformasjon: PostResource<EndreKontaktinformasjonRequest>;
    postnummer: RestResource<KodeverkResponse>;
    endreAdresse: PostResource<EndreAdresseRequest>;
    valuta: RestResource<KodeverkResponse>;
    land: RestResource<KodeverkResponse>;
    utbetalinger: RestResource<UtbetalingerResponse>;
    sykepenger: RestResource<SykepengerResponse>;
    pleiepenger: RestResource<PleiepengerResponse>;
    foreldrepenger: RestResource<ForeldrepengerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
    sakstema: RestResource<SakstemaResponse>;
    featureToggles: RestResource<{ [name: string]: boolean }>;
    brukersVarsler: RestResource<Varsel[]>;
    tråderOgMeldinger: RestResource<Traad[]>;
    oppgaveGsakTema: RestResource<GsakTema[]>;
    opprettOppgave: PostResource<OpprettOppgaveRequest>;
    sendReferat: PostResource<SendReferatRequest>;
    sendSpørsmål: PostResource<SendSpørsmålRequest>;
    sendSvar: PostResource<ForsettDialogRequest>;
    personsok: PostResource<PersonsokRequest, PersonsokResponse[]>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        innloggetSaksbehandler: innloggetSaksbehandlerReducer,
        personinformasjon: personinformasjonReducer,
        brukersNavKontor: navkontorReducer,
        oppgaver: oppgaverReducer,
        tildDelteOppgaver: tildelteOppgaver,
        leggTilbakeOppgave: leggTilbakeOppgave,
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
        sendReferat: sendReferat,
        sendSpørsmål: sendSpørsmål,
        sendSvar: sendSvar,
        opprettOppgave: opprettOppgave,
        personsok: personsok
    },
    ['innloggetSaksbehandler', 'baseUrl', 'postnummer', 'valuta', 'land', 'featureToggles', 'oppgaver']
);
