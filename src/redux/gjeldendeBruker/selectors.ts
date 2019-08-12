import { AppState } from '../reducers';

export function fnrSelector(state: AppState): string {
    return state.gjeldendeBruker.fødselsnummer;
}
