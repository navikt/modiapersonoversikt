import { Person } from '../models/person';
import { Action, Dispatch } from 'redux';
import { FetchError, FetchSuccess, RestActions, STATUS } from './utils';

export interface PersonState {
    data: Person;
    status: STATUS;
    error: string | null;
}

const mockPerson = {
    fornavn: 'Aremark',
    etternavn: 'Testfamilien',
    fodselsnummer: '10108000398'
};

const reducerName = 'person/';

const actionNames = {
    PENDING: reducerName + STATUS.PENDING,
    OK: reducerName + STATUS.OK,
    ERROR: reducerName + STATUS.ERROR
};

const initialState: PersonState = {
    data: mockPerson,
    status: STATUS.NOT_STARTED,
    error: null
};

function mockFetch(fodselsnummer: string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(mockPerson); }, 2500);
    });
}

export function hentPerson(fodselsnummer: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.PENDING});
        return mockFetch(fodselsnummer)
            .then((person) => {
                dispatch({type: actionNames.OK, data: person});
                return person;
            })
            .catch((err) => {
                dispatch({type: actionNames.ERROR, error: err});
            });
    };
}

export default function reducer(state: PersonState = initialState, action: RestActions<Person>): PersonState {
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