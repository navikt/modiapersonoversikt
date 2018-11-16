import { hentSykepenger } from './sykepenger';
import { hentPleiepenger } from './pleiepenger';
import { hentForeldrepenger } from './foreldrepenger';
import { AsyncDispatch } from '../../ThunkTypes';

export function hentAlleYtelser(dispatch: AsyncDispatch, fødselsnummer: string) {
    dispatch(hentSykepenger(fødselsnummer));
    dispatch(hentPleiepenger(fødselsnummer));
    dispatch(hentForeldrepenger(fødselsnummer));
}