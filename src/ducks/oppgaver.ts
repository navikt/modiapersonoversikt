import { Dispatch } from 'react-redux';
import { Action } from 'history';
import { push } from 'react-router-redux';

import { FetchError, FetchSuccess, RestActions, STATUS } from './utils';
import { plukkOppgaveFraServer } from '../api/oppgave-api';
import { paths } from '../routes/routing';
import { Oppgave } from '../models/oppgave';

const reducerName = 'person/';

export interface OppgaverState {
    data: Oppgave[];
    status: STATUS;
    error: string | null;
}

const initialState: OppgaverState = {
    data: [],
    status: STATUS.NOT_STARTED,
    error: null
};

const actionNames = {
    PENDING: reducerName + STATUS.PENDING,
    OK: reducerName + STATUS.OK,
    ERROR: reducerName + STATUS.ERROR
};

function getFodselsnummerfraOppgaver(oppgaver: Oppgave[]) {
    if (oppgaver.length === 0) {
        return null;
    } else {
        return oppgaver[0].fodselsnummer;
    }
}

export function plukkOppgave(enhet: string, temagruppe: string) {
    return (dispatch: Dispatch<Action>) => {
        dispatch({ type: actionNames.PENDING});
        return plukkOppgaveFraServer(enhet, temagruppe)
            .then((oppgaver) => {
                dispatch({type: actionNames.OK, data: oppgaver});
                return oppgaver;
            })
            .then((oppgaver: Oppgave[]) => {
                const fodselsnummer = getFodselsnummerfraOppgaver(oppgaver);
                if (fodselsnummer) {
                    dispatch(push(paths.personUri + `/${fodselsnummer}`));
                }
                return oppgaver;
            })
            .catch((err) => {
                dispatch({type: actionNames.ERROR, error: err});
            });
    };
}

export default function reducer(state: OppgaverState = initialState, action: RestActions<Oppgave[]>): OppgaverState {
    switch (action.type) {
        case actionNames.PENDING:
            return {...state, status: STATUS.PENDING };
        case actionNames.OK:
            return {...state, status: STATUS.OK, data: (<FetchSuccess<Oppgave[]>> action).data};
        case actionNames.ERROR:
            return {...state, status: STATUS.ERROR, error: (<FetchError> action).error};
        default:
            return state;
    }
}