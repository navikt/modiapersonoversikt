import utbetalingerReducer from './utbetalinger';
import { RestResource } from '../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { combineResettableReducers } from '../reducer-utils';
import utbetalingerOversikt from './utbetalingerOversikt';

export interface RestEndepunkter {
    utbetalinger: RestResource<UtbetalingerResponse>;
    utbetalingerOversikt: RestResource<UtbetalingerResponse>;
}

export default combineResettableReducers<RestEndepunkter>(
    {
        utbetalinger: utbetalingerReducer,
        utbetalingerOversikt: utbetalingerOversikt
    },
    []
);
