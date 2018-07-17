import { createActionsAndReducer } from './restReducer';
import { getVergemal } from '../../api/vergemal-api';

const { reducer, action, actionNames } = createActionsAndReducer('vergemal');

export function hentVergemal(fødselsnummer: string) {
    return action(() => getVergemal(fødselsnummer));
}

export { actionNames };
export default reducer;