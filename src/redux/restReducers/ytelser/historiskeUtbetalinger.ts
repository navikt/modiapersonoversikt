import { createActionsAndReducer } from '../restReducer';
import { getUtbetalinger } from '../../../api/utbetaling-api';
import moment from 'moment';

const { reducer, action, tilbakestillReducer } = createActionsAndReducer('historiskeUtbetalingerYtelser');

export function hentHistoriskeUtbetalinger(fødselsnummer: string) {
    return action(() =>
        getUtbetalinger(
            fødselsnummer,
            moment()
                .add(-2, 'year')
                .toDate(),
            new Date()
        )
    );
}

export function resetHistoriskeUtbetalingerReducer() {
    return tilbakestillReducer;
}

export default reducer;
