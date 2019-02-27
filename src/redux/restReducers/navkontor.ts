import { getNavkontor } from '../../api/navkontor';
import { createActionsAndReducer } from './restReducer';
import { Kodeverk } from '../../models/kodeverk';

const { reducer, action, actionNames, tilbakestillReducer } = createActionsAndReducer('navkontor');

export function hentNavKontor(geografiskTilknytning?: string, diskresjonsKode?: Kodeverk) {
    if (!geografiskTilknytning && !diskresjonsKode) {
        return action(() => new Promise(resolve => resolve({ navKontor: null })));
    }

    return action(() => getNavkontor(geografiskTilknytning, diskresjonsKode ? diskresjonsKode.kodeRef : undefined));
}

export function resetNavKontorReducer() {
    return tilbakestillReducer;
}

export { actionNames };
export default reducer;
