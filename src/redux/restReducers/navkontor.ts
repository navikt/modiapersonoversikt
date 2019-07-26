import { getNavkontor } from '../../api/navkontor';
import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { Kodeverk } from '../../models/kodeverk';

const { reducer, action, actionNames, tilbakestill } = createActionsAndReducerDeprecated('navkontor');

export function hentNavKontor(geografiskTilknytning?: string, diskresjonsKode?: Kodeverk) {
    if (!geografiskTilknytning && !diskresjonsKode) {
        return action(() => new Promise(resolve => resolve({ navKontor: null })));
    }

    return action(() => getNavkontor(geografiskTilknytning, diskresjonsKode ? diskresjonsKode.kodeRef : undefined));
}

export const resetNavKontorResource = tilbakestill;

export { actionNames };
export default reducer;
