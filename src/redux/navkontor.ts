import { getNavkontor } from '../api/navkontor';
import { createActionsAndReducer } from './restReducer';

const { reducer, action, actionNames } = createActionsAndReducer('navkontor');

export function hentNavKontor(geografiskTilknytning: string, diskresjonsKode?: string) {
    return action(() => getNavkontor(geografiskTilknytning, diskresjonsKode));
}

export function settBrukerUtenNavKontor() {
    return action(() =>
        new Promise((resolve) => {
            resolve(undefined);
        })
    );
}

export { actionNames };
export default reducer;