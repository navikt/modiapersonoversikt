import { AnyAction } from 'redux';
import { hentSykepenger } from './sykepenger';
import { hentPleiepenger } from './pleiepenger';
import { hentForeldrepenger } from './foreldrepenger';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../reducers';

export function hentAlleYtelser(dispatch: ThunkDispatch<AppState, undefined, AnyAction>, fødselsnummer: string) {
    dispatch(hentSykepenger(fødselsnummer));
    dispatch(hentPleiepenger(fødselsnummer));
    dispatch(hentForeldrepenger(fødselsnummer));
}