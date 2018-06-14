import { getNavkontor } from '../api/navkontor';
import { createActionsAndReducer } from './restReducer';

const { reducer, action, actionNames, tilbakestillReducer } = createActionsAndReducer('navkontor');

export function hentNavKontor(geografiskTilknytning?: string, diskresjonsKode?: string) {
    if (!geografiskTilknytning && !diskresjonsKode) {
        return action(() => new Promise(resolve => resolve({navKontor: null})));
    }

    return action(() => getNavkontor(geografiskTilknytning, diskresjonsKode));
}

export function resetNavKontorReducer() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;