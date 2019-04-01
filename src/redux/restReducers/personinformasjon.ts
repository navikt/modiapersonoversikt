import { getPerson } from '../../api/person-api';
import { createActionsAndReducer, isLoaded, Loaded, RestResource } from './restResource';
import { Person, PersonRespons } from '../../models/person/person';

const { reducer, action, actionNames, reload } = createActionsAndReducer('personinformasjon');

export function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export function reloadPerson(fødselsnummer: string) {
    return reload(() => getPerson(fødselsnummer));
}

export function isLoadedPerson(person: RestResource<PersonRespons>): person is Loaded<Person> {
    return isLoaded(person) && person.data.hasOwnProperty('fødselsnummer');
}

export function getFnrFromPerson(person: RestResource<PersonRespons>): string | undefined {
    return isLoadedPerson(person) ? person.data.fødselsnummer : undefined;
}

export const personinformasjonActionNames = actionNames;

export default reducer;
