import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { getDetaljertOppfolging, getOppfolging } from '../../api/oppfolging-api';

const { reducer, action, reload, tilbakestill } = createActionsAndReducerDeprecated('oppfolging');

export function hentOppfolging(fødselsnummer: string) {
    return action(() => getOppfolging(fødselsnummer));
}

export function reloadOppfolging(fødselsnummer: string) {
    return reload(() => getOppfolging(fødselsnummer));
}

export function resetOppfolgingResource() {
    return tilbakestill;
}

export function hentDetaljertOppfolging(fødselsnummer: string, startDato: Date, sluttDato: Date) {
    return action(() => getDetaljertOppfolging(fødselsnummer, startDato, sluttDato));
}

export function reloadDetaljertOppfolging(fødselsnummer: string, startDato: Date, sluttDato: Date) {
    return reload(() => getDetaljertOppfolging(fødselsnummer, startDato, sluttDato));
}

export default reducer;
