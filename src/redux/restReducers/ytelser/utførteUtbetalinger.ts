import { createRestResourceReducerAndActions } from '../../../rest/utils/restResource';
import { UtbetalingerResponse } from '../../../models/utbetalinger';
import moment from 'moment';
import { apiBaseUri } from '../../../api/config';
import { AppState } from '../../reducers';
import { backendDatoformat } from '../../../mock/utils/mock-utils';
import { AsyncDispatch } from '../../ThunkTypes';

function getUtbetalingerFetchUri(state: AppState, startDato: Date) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    const fra = moment(startDato).format(backendDatoformat);
    const til = moment().format(backendDatoformat);
    return `${apiBaseUri}/utbetaling/${fodselsnummer}?startDato=${fra}&sluttDato=${til}`;
}

function getNyligeUtbetalingerFetchUri(state: AppState) {
    const nittiDagerTilbakeITid = moment()
        .subtract(90, 'day')
        .startOf('day')
        .toDate();
    return getUtbetalingerFetchUri(state, nittiDagerTilbakeITid);
}

export function getToÅrGamleUtbetalingerFetchUri(state: AppState) {
    const toÅrTilbakeITid = moment()
        .subtract(2, 'year')
        .startOf('day')
        .toDate();
    return getUtbetalingerFetchUri(state, toÅrTilbakeITid);
}

export function hentToÅrgamleUtbetalingerActionCreator(dispatch: AsyncDispatch, getState: () => AppState) {
    dispatch(
        getState().restResources.utførteUtbetalingerYtelser.actions.reloadWithCustomUriCreator(
            getToÅrGamleUtbetalingerFetchUri
        )
    );
}

export default createRestResourceReducerAndActions<UtbetalingerResponse>(
    'utførteUtbetalingerYtelser',
    getNyligeUtbetalingerFetchUri
);
