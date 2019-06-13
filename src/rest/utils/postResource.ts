import { AsyncDispatch } from '../../redux/ThunkTypes';
import { Action } from 'redux';
import { post } from '../../api/api';
import { AppState } from '../../redux/reducers';

export interface PostResourceActionTypes {
    POSTING: string;
    FINISHED: string;
    FAILED: string;
    INITIALIZE: string;
}

export enum PostStatus {
    NOT_STARTED = 'NOT_STARTED',
    POSTING = 'POSTING',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL'
}

export interface PostResource<T> {
    status: PostStatus;
    actions: {
        reset: (dispatch: AsyncDispatch) => void;
        setError: (e: Error) => (dispatch: AsyncDispatch) => void;
        post: (payload: T, callback?: () => void) => (dispatch: AsyncDispatch, getState: () => AppState) => void;
    };
}

export interface NotStartedPostResource<T> extends PostResource<T> {
    status: PostStatus.NOT_STARTED;
}

export interface PostingPostResource<T> extends PostResource<T> {
    status: PostStatus.POSTING;
    payload: T;
}

export interface FinishedPostResource<T> extends PostResource<T> {
    status: PostStatus.SUCCESS;
    payload: T;
}

export interface FailedPostResource<T> extends PostResource<T> {
    status: PostStatus.FAIL;
    error: Error;
}

export function isNotStartedPosting<T>(postResource: PostResource<T>): postResource is NotStartedPostResource<T> {
    return postResource.status === PostStatus.NOT_STARTED;
}

export function isPosting<T>(postResource: PostResource<T>): postResource is PostingPostResource<T> {
    return postResource.status === PostStatus.POSTING;
}

export function isFinishedPosting<T>(postResource: PostResource<T>): postResource is FinishedPostResource<T> {
    return postResource.status === PostStatus.SUCCESS;
}

export function isFailedPosting<T>(postResource: PostResource<T>): postResource is FailedPostResource<T> {
    return postResource.status === PostStatus.FAIL;
}

function getActionTypes(resourceNavn: string): PostResourceActionTypes {
    const navnUppercase = resourceNavn.toUpperCase() + ' / ';
    return {
        POSTING: navnUppercase + 'STARTED POSTING',
        FINISHED: navnUppercase + 'FINISHED POSTING',
        FAILED: navnUppercase + 'FAILED POSTING',
        INITIALIZE: navnUppercase + 'INITIALIZED POSTING '
    };
}

export interface PostAction<T> {
    type: PostResourceActionTypes;
    payload: T;
}

export interface FailAction<T> {
    type: PostResourceActionTypes;
    error: Error;
}

export type PostUriCreator = (state: AppState) => string;

function createPostResourceReducerAndActions<T extends object>(resourceNavn: string, getPostUri: PostUriCreator) {
    const actionNames = getActionTypes(resourceNavn);

    const initialState: PostResource<T> = {
        status: PostStatus.NOT_STARTED,
        actions: {
            reset: dispatch => dispatch({ type: actionNames.INITIALIZE }),
            setError: (error: Error) => dispatch => dispatch({ type: actionNames.FAILED, error: error }),
            post: (payload: T, callback?: () => void) => (dispatch: AsyncDispatch, getState: () => AppState) => {
                dispatch({ type: actionNames.POSTING, payload: payload });
                post(getPostUri(getState()), payload)
                    .then(() => dispatch({ type: actionNames.FINISHED }))
                    .then(() => callback && callback())
                    .catch((error: Error) => dispatch({ type: actionNames.FAILED, error: error }));
            }
        }
    };

    return (state: PostResource<T> = initialState, action: Action): PostResource<T> => {
        switch (action.type) {
            case actionNames.INITIALIZE:
                return initialState;
            case actionNames.POSTING:
                return {
                    ...state,
                    status: PostStatus.POSTING,
                    payload: (action as PostAction<T>).payload
                } as PostingPostResource<T>;
            case actionNames.FINISHED:
                return {
                    ...state,
                    status: PostStatus.SUCCESS
                };
            case actionNames.FAILED:
                return {
                    ...state,
                    status: PostStatus.FAIL,
                    error: (action as FailAction<T>).error
                } as FailedPostResource<T>;
            default:
                return state;
        }
    };
}

export default createPostResourceReducerAndActions;
