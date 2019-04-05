import { getEgenAnsatt } from '../../api/egenansatt';
import { createActionsAndReducerDeprecated } from './deprecatedRestResource';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('egenansatt');

export function erEgenAnsatt(fødselsnummer: string) {
    return action(() => getEgenAnsatt(fødselsnummer));
}

export { actionNames };
export default reducer;
