import { getPerson } from '../api/person-api';
import { createActionsAndReducer } from './restReducer';

const { reducer, action} = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export default reducer;
