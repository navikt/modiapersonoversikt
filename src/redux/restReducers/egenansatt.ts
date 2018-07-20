import { getEgenAnsatt } from '../../api/egenansatt';
import { createActionsAndReducer } from './restReducer';

const { reducer, action, actionNames } = createActionsAndReducer('egenansatt');

export function erEgenAnsatt(fødselsnummer: string) {
    return action(() => getEgenAnsatt(fødselsnummer));
}

export { actionNames };
export default reducer;