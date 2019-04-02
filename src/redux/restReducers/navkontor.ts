import { getNavkontor } from '../../api/navkontor';
import { createActionsAndReducer } from './restResource';
import { Kodeverk } from '../../models/kodeverk';

const { reducer, action, actionNames, tilbakestill } = createActionsAndReducer('navkontor');

export function hentNavKontor(geografiskTilknytning?: string, diskresjonsKode?: Kodeverk) {
    if (!geografiskTilknytning && !diskresjonsKode) {
        return action(() => new Promise(resolve => resolve({ navKontor: null })));
    }

    return action(() => getNavkontor(geografiskTilknytning, diskresjonsKode ? diskresjonsKode.kodeRef : undefined));
}

export function resetNavKontorResource() {
    return tilbakestill;
}

export { actionNames };
export default reducer;
