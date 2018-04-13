import { Person } from '../models/person';
import { Action, Dispatch } from 'redux';
import { FetchError, FetchSuccess, RestActions, STATUS } from './utils';
import { getPerson } from '../api/person-api';
import { aremark } from '../mock/person-mock';
import { hentNavKontor } from './navkontor';

export interface PersoninformasjonState {
    data: Person;
    status: STATUS;
    error: string | null;
}

const reducerName = 'personinformasjon/';

export const actionNames = {
    PENDING: reducerName + STATUS.PENDING,
    OK: reducerName + STATUS.OK,
    ERROR: reducerName + STATUS.ERROR
};

const initialState: PersoninformasjonState = {
    data: aremark,
    status: STATUS.NOT_STARTED,
    error: null
};

export function hentPerson(fodselsnummer: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.PENDING});
        return getPerson(fodselsnummer)
            .then((person) => {
                dispatch({type: actionNames.OK, data: person});
                dispatch(hentNavKontor(person.geografiskTilknytning, person.diskresjonskode));
                return person;
            })
            .catch((err) => {
                dispatch({type: actionNames.ERROR, error: err});
            });
    };
}

export default function reducer(state: PersoninformasjonState = initialState, action: RestActions<Person>)
    : PersoninformasjonState {
    switch (action.type) {
        case actionNames.PENDING:
            return {...state, status: STATUS.PENDING };
        case actionNames.OK:
            return {...state, status: STATUS.OK, data: (<FetchSuccess<Person>> action).data};
        case actionNames.ERROR:
            return {...state, status: STATUS.ERROR, error: (<FetchError> action).error};
        default:
            return state;
    }
}
