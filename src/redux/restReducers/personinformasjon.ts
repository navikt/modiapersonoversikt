import { Person, PersonRespons } from '../../models/person/person';
import { createRestResourceReducerAndActions, hasData, HasData, RestResource } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';

function getPersondataFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fodselsnummer}`;
}

export default createRestResourceReducerAndActions<PersonRespons>('personinformasjon', getPersondataFetchUri);

export function isLoadedPerson(person: PersonRespons): person is Person {
    return person.hasOwnProperty('fødselsnummer');
}

// @ts-ignore
export function isLoadedPersonResource(person: RestResource<PersonRespons>): person is HasData<Person> {
    return hasData(person) && isLoadedPerson(person.data);
}

export function getFnrFromPerson(person: RestResource<PersonRespons>): string | undefined {
    return isLoadedPersonResource(person) ? person.data.fødselsnummer : undefined;
}
