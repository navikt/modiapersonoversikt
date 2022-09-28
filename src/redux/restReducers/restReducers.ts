import innloggetSaksbehandlerReducer from './innloggetSaksbehandler';
import tilgangskontrollReducer from './tilgangskontroll';
import baseUrlReducer from './baseurls';
import veilederRollerReducer from './veilederRoller';
import utbetalingerReducer from './utbetalinger';
import sykepengerReducer from './ytelser/sykepenger';
import pleiepengerReducer from './ytelser/pleiepenger';
import foreldrepengerReducer from './ytelser/foreldrepenger';
import oppfolgingReducer from './oppfolging';
import featureToggleReducer from './featureToggles';
import meldingerReducer from './meldinger/meldinger';
import { VeilederRoller } from '../../models/veilederRoller';
import { BaseUrlsResponse } from '../../models/baseurls';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { Traad } from '../../models/meldinger/meldinger';
import { Oppgave } from '../../models/meldinger/oppgave';
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
    tildelteOppgaver: RestResource<Oppgave[]>;
    baseUrl: RestResource<BaseUrlsResponse>;
    veilederRoller: RestResource<VeilederRoller>;
    utbetalinger: RestResource<UtbetalingerResponse>;
    utbetalingerOversikt: RestResource<UtbetalingerResponse>;
    sykepenger: RestResource<SykepengerResponse>;
    pleiepenger: RestResource<PleiepengerResponse>;
    foreldrepenger: RestResource<ForeldrepengerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
    featureToggles: RestResource<{ [name: string]: boolean }>;
    traader: RestResource<Traad[]>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        innloggetSaksbehandler: innloggetSaksbehandlerReducer,
        tilgangskontroll: tilgangskontrollReducer,
        saksbehandlersEnheter: saksbehandlersEnheter,
        tildelteOppgaver: tildelteOppgaver,
        baseUrl: baseUrlReducer,
        veilederRoller: veilederRollerReducer,
        utbetalinger: utbetalingerReducer,
        utbetalingerOversikt: utbetalingerOversikt,
        sykepenger: sykepengerReducer,
        pleiepenger: pleiepengerReducer,
        foreldrepenger: foreldrepengerReducer,
        oppfolging: oppfolgingReducer,
        featureToggles: featureToggleReducer,
        traader: meldingerReducer
    },
    ['innloggetSaksbehandler', 'veilederRoller', 'baseUrl', 'featureToggles', 'saksbehandlersEnheter']
);
