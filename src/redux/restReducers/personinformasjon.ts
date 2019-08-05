import { Person, PersonRespons } from '../../models/person/person';
import { createRestResourceReducerAndActions, hasData, HasData, RestResource } from '../../rest/utils/restResource';
import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';

function getPersondataFetchUri(state: AppState) {
    const fodselsnummer = state.gjeldendeBruker.fødselsnummer;
    return `${apiBaseUri}/person/${fodselsnummer}`;
}

export default createRestResourceReducerAndActions<PersonRespons>('personinformasjon', getPersondataFetchUri);

// @ts-ignore
export function isLoadedPerson(person: RestResource<PersonRespons>): person is HasData<Person> {
    return hasData(person) && person.data.hasOwnProperty('fødselsnummer');
}

export function getFnrFromPerson(person: RestResource<PersonRespons>): string | undefined {
    return isLoadedPerson(person) ? person.data.fødselsnummer : undefined;
}
