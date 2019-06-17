import { AppState } from '../reducers';
import { apiBaseUri } from '../../api/config';
import { PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import createPostResourceReducerAndActions from '../../rest/utils/postResource';

export function getPersonsokPostUri(state: AppState): string {
    return `${apiBaseUri}/personsok`;
}

export default createPostResourceReducerAndActions<PersonsokRequest, PersonsokResponse[]>(
    'personsok',
    getPersonsokPostUri
);
