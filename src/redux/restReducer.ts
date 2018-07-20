import { doThenDispatch, FetchError, FetchSuccess, STATUS } from './utils';
import { Action } from 'redux';
import { Dispatch } from 'react-redux';

export interface ActionTypes {
    STARTING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

function getActionTypes(reducerNavn: string): ActionTypes {
    const navnUppercase = reducerNavn.toUpperCase() + ' / ';
    return {
        STARTING: navnUppercase + 'STARTING',
        FINISHED: navnUppercase + 'FINISHED',
        FAILED: navnUppercase + 'FAILED',
        INITIALIZE: navnUppercase + 'INITIALIZE'
    };
}

export function createActionsAndReducer<T>(reducerNavn: string) {
    const actionTypes = getActionTypes(reducerNavn);

    const actionFunction = (fn: () => Promise<T>) => doThenDispatch(fn, actionTypes);

    const tilbakestillReducer = (dispatch: Dispatch<Action>) => { dispatch({type: actionTypes.INITIALIZE}); };

    const initialState = {
        data: {},
        status: STATUS.NOT_STARTED
    };
    return {
        action: actionFunction,
        tilbakestillReducer: tilbakestillReducer,
        reducer: (state = initialState, action: Action) => {
            switch (action.type) {
                case actionTypes.STARTING:
                    const status: STATUS = state.status === STATUS.NOT_STARTED ? STATUS.LOADING : STATUS.RELOADING;
                    console.log(status, action.type);
                    return {
                        ...state,
                        status: status
                    };
                case actionTypes.FINISHED:
                    console.log(STATUS.OK, action.type);
                    return {
                        ...state,
                        status: STATUS.OK,
                        data: (<FetchSuccess<object>> action).data
                    };
                case actionTypes.FAILED:
                    console.log(STATUS.ERROR, action.type);
                    return {
                        ...state,
                        status: STATUS.ERROR,
                        error: (<FetchError> action).error
                    };
                case actionTypes.INITIALIZE:
                    console.log(STATUS.NOT_STARTED, action.type);
                    return initialState;
                default:
                    return state;
            }
        },
        actionNames: actionTypes
    };
}