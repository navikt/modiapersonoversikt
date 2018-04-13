import { Dispatch } from 'react-redux';
import { Action } from 'history';
import { FetchError, FetchSuccess, RestActions, STATUS } from './utils';
import { getNavkontor } from '../api/navkontor';
import { NavKontorInterface } from '../models/navkontor';

const reducerName = 'navkontor/';

export interface NavkontorState {
    data: NavKontorInterface | null;
    status: STATUS;
    error: string | null;
}

export const initialState: NavkontorState = {
    data: null,
    status: STATUS.NOT_STARTED,
    error: null
};

export const actionNames = {
    PENDING: reducerName + STATUS.PENDING,
    OK: reducerName + STATUS.OK,
    ERROR: reducerName + STATUS.ERROR
};

export function hentNavKontor(geografiskTilknytning: string, diskresjonsKode?: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.PENDING});
        return getNavkontor(geografiskTilknytning, diskresjonsKode)
            .then((navKontor) => {
                dispatch({type: actionNames.OK, data: navKontor});
                return navKontor;
            })
            .catch((err) => {
                dispatch({type: actionNames.ERROR, error: err});
            });
    };
}

export default function reducer(state: NavkontorState = initialState, action: RestActions<NavKontorInterface>)
    : NavkontorState {
    switch (action.type) {
        case actionNames.PENDING:
            return {...state, status: STATUS.PENDING };
        case actionNames.OK:
            return {...state, status: STATUS.OK, data: (<FetchSuccess<NavKontorInterface>> action).data};
        case actionNames.ERROR:
            return {...state, status: STATUS.ERROR, error: (<FetchError> action).error};
        default:
            return state;
    }
}
