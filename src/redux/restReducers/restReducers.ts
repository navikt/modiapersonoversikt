import utbetalingerReducer from './utbetalinger';
import oppfolgingReducer from './oppfolging';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { combineResettableReducers } from '../reducer-utils';
import utbetalingerOversikt from './utbetalingerOversikt';

export interface RestEndepunkter {
    utbetalinger: RestResource<UtbetalingerResponse>;
    utbetalingerOversikt: RestResource<UtbetalingerResponse>;
    oppfolging: RestResource<DetaljertOppfolging>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        utbetalinger: utbetalingerReducer,
        utbetalingerOversikt: utbetalingerOversikt,
        oppfolging: oppfolgingReducer
    },
    []
);
