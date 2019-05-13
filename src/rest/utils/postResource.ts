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
        post: (payload: T) => (dispatch: AsyncDispatch, getState: () => AppState) => void;
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
    payload: T;
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
        POSTING: navnUppercase + 'POSTING',
        FINISHED: navnUppercase + 'FINISHED',
        FAILED: navnUppercase + 'FAILED',
        INITIALIZE: navnUppercase + 'INITIALIZE'
    };
}

export interface PostAction<T> {
    type: PostResourceActionTypes;
    payload: T;
}

export type PostUriCreator = (state: AppState) => string;

function createPostResourceReducerAndActions<T extends object>(resourceNavn: string, getPostUri: PostUriCreator) {
    const actionNames = getActionTypes(resourceNavn);

    const initialState: PostResource<T> = {
        status: PostStatus.NOT_STARTED,
        actions: {
            reset: dispatch => dispatch({ type: actionNames.INITIALIZE }),
            post: (payload: T) => (dispatch: AsyncDispatch, getState: () => AppState) => {
                dispatch({ type: actionNames.POSTING, payload: payload });
                post(getPostUri(getState()), payload)
                    .then(() => dispatch({ type: actionNames.FINISHED }))
                    .catch(() => dispatch({ type: actionNames.FAILED }));
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
                    status: PostStatus.FAIL
                };
            default:
                return state;
        }
    };
}

export default createPostResourceReducerAndActions;
