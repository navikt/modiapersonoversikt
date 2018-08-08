import { Dispatch } from 'react-redux';
import { Action } from 'redux';
import { hentSykepenger } from './sykepenger';
import { hentPleiepenger } from './pleiepenger';
import { hentForeldrepenger } from './foreldrepenger';

export function hentAlleYtelser(dispatch: Dispatch<Action>, fødselsnummer: string) {
    dispatch(hentSykepenger(fødselsnummer));
    dispatch(hentPleiepenger(fødselsnummer));
    dispatch(hentForeldrepenger(fødselsnummer));
}