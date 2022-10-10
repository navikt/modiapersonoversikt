import utbetalingerReducer from './utbetalinger';
import oppfolgingReducer from './oppfolging';
import meldingerReducer from './meldinger/meldinger';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { Traad } from '../../models/meldinger/meldinger';
import { combineResettableReducers } from '../reducer-utils';
import utbetalingerOversikt from './utbetalingerOversikt';

export interface RestEndepunkter {
    utbetalinger: RestResource<UtbetalingerResponse>;
    utbetalingerOversikt: RestResource<UtbetalingerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
    traader: RestResource<Traad[]>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        utbetalinger: utbetalingerReducer,
        utbetalingerOversikt: utbetalingerOversikt,
        oppfolging: oppfolgingReducer,
        traader: meldingerReducer
    },
    []
);
