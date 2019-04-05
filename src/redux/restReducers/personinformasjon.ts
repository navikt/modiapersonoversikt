import { getPerson } from '../../api/person-api';
import { createActionsAndReducerDeprecated, isLoaded, Loaded, DeprecatedRestResource } from './deprecatedRestResource';
import { Person, PersonRespons } from '../../models/person/person';

const { reducer, action, actionNames, reload } = createActionsAndReducerDeprecated('personinformasjon');

export function hentPerson(fødselsnummer: string) {
    return action(() => getPerson(fødselsnummer));
}

export function reloadPerson(fødselsnummer: string) {
    return reload(() => getPerson(fødselsnummer));
}

export function isLoadedPerson(person: DeprecatedRestResource<PersonRespons>): person is Loaded<Person> {
    return isLoaded(person) && person.data.hasOwnProperty('fødselsnummer');
}

export function getFnrFromPerson(person: DeprecatedRestResource<PersonRespons>): string | undefined {
    return isLoadedPerson(person) ? person.data.fødselsnummer : undefined;
}

export const personinformasjonActionNames = actionNames;

export default reducer;
