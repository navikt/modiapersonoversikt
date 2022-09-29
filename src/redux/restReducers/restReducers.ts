import innloggetSaksbehandlerReducer from './innloggetSaksbehandler';
import utbetalingerReducer from './utbetalinger';
import oppfolgingReducer from './oppfolging';
import featureToggleReducer from './featureToggles';
import meldingerReducer from './meldinger/meldinger';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { Traad } from '../../models/meldinger/meldinger';
import { Oppgave } from '../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../models/innloggetSaksbehandler';
import tildelteOppgaver from './tildelteOppgaver';
import { combineResettableReducers } from '../reducer-utils';
import utbetalingerOversikt from './utbetalingerOversikt';
import saksbehandlersEnheter from './saksbehandlersEnheter';
import { SaksbehandlersEnheter } from '../../models/saksbehandlersEnheter';

export interface RestEndepunkter {
    innloggetSaksbehandler: RestResource<InnloggetSaksbehandler>; // TODO denne kan fjernes, eller evt erstattes med kall til modiacontextholder
    saksbehandlersEnheter: RestResource<SaksbehandlersEnheter>; // TODO denne bør fjernes, eller evt erstattes med kall til modiacontextholder
    tildelteOppgaver: RestResource<Oppgave[]>;
    utbetalinger: RestResource<UtbetalingerResponse>;
    utbetalingerOversikt: RestResource<UtbetalingerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
    featureToggles: RestResource<{ [name: string]: boolean }>;
    traader: RestResource<Traad[]>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        innloggetSaksbehandler: innloggetSaksbehandlerReducer,
        saksbehandlersEnheter: saksbehandlersEnheter,
        tildelteOppgaver: tildelteOppgaver,
        utbetalinger: utbetalingerReducer,
        utbetalingerOversikt: utbetalingerOversikt,
        oppfolging: oppfolgingReducer,
        featureToggles: featureToggleReducer,
        traader: meldingerReducer
    },
    ['innloggetSaksbehandler', 'featureToggles', 'saksbehandlersEnheter']
);
