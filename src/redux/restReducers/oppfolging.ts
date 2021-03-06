import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { apiBaseUri } from '../../api/config';
import { AppState } from '../reducers';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { AsyncDispatch } from '../ThunkTypes';

function getDetaljertOppfolgingFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    const periode = state.oppfolging.valgtPeriode;
    const uri = `${apiBaseUri}/oppfolging/${fodselsnummer}/ytelserogkontrakter${lagQueryParametre(
        periode.fra,
        periode.til
    )}`;
    return uri;
}

function lagQueryParametre(startDato: string, sluttDato: string): string {
    return `?startDato=${startDato}&sluttDato=${sluttDato}`;
}

export function reloadOppfolingActionCreator(dispatch: AsyncDispatch, getState: () => AppState) {
    dispatch(getState().restResources.oppfolging.actions.reload);
}

export default createRestResourceReducerAndActions<DetaljertOppfolging>('oppfolging', getDetaljertOppfolgingFetchUri);
