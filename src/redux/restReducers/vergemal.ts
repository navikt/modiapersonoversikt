import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { getVergemal } from '../../api/vergemal-api';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('vergemal');

export function hentVergemal(fødselsnummer: string) {
    return action(() => getVergemal(fødselsnummer));
}

export { actionNames };
export default reducer;
