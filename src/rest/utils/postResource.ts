import { AsyncDispatch } from '../../redux/ThunkTypes';
import { Action } from 'redux';
import { post } from '../../api/api';
import { AppState } from '../../redux/reducers';
import { loggError, loggEvent } from '../../utils/frontendLogger';

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

export interface PostResource<Request, Response = any> {
    status: PostStatus;
    actions: {
        reset: (dispatch: AsyncDispatch) => void;
        setError: (e: Error) => Action;
        setResponse: (response: Response) => Action;
        post: (
            payload: Request,
            callback?: (response: Response) => void
        ) => (dispatch: AsyncDispatch, getState: () => AppState) => void;
    };
}

export interface NotStartedPostResource<Request, Response> extends PostResource<Request, Response> {
    status: PostStatus.NOT_STARTED;
}

export interface PostingPostResource<Request, Response> extends PostResource<Request, Response> {
    status: PostStatus.POSTING;
    payload: Request;
}

export interface FinishedPostResource<Request, Response> extends PostResource<Request, Response> {
    status: PostStatus.SUCCESS;
    response: Response;
    payload: Request;
}

export interface FailedPostResource<Request, Response> extends PostResource<Request, Response> {
    status: PostStatus.FAIL;
    error: string;
    payload: Request;
}

export function isNotStartedPosting<Request, Response>(
    postResource: PostResource<Request, Response>
): postResource is NotStartedPostResource<Request, Response> {
    return postResource.status === PostStatus.NOT_STARTED;
}

export function isPosting<Request, Response>(
    postResource: PostResource<Request, Response>
): postResource is PostingPostResource<Request, Response> {
    return postResource.status === PostStatus.POSTING;
}

export function isFinishedPosting<Request, Response>(
    postResource: PostResource<Request, Response>
): postResource is FinishedPostResource<Request, Response> {
    return postResource.status === PostStatus.SUCCESS;
}

export function isFailedPosting<Request, Response>(
    postResource: PostResource<Request, Response>
): postResource is FailedPostResource<Request, Response> {
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

export interface PostAction<Request, Response> {
    type: PostResourceActionTypes;
    payload: Request;
}

export interface FinishedPostAction<Request, Response> {
    type: PostResourceActionTypes;
    response: Response;
}

export interface FailAction<Request, Response> {
    type: PostResourceActionTypes;
    error: string;
}

export type PostUriCreator<Request> = (state: AppState, request: Request) => string;

function createPostResourceReducerAndActions<Request extends object, Response = any>(
    resourceNavn: string,
    getPostUri: PostUriCreator<Request>
) {
    const actionNames = getActionTypes(resourceNavn);

    const initialState: PostResource<Request, Response> = {
        status: PostStatus.NOT_STARTED,
        actions: {
            reset: dispatch => dispatch({ type: actionNames.INITIALIZE }),
            setError: (error: Error) => ({ type: actionNames.FAILED, error: error }),
            setResponse: response => ({ type: actionNames.FINISHED, response: response }),
            post: (request: Request, callback?: (response: Response) => void) => (
                dispatch: AsyncDispatch,
                getState: () => AppState
            ) => {
                dispatch({ type: actionNames.POSTING, payload: request });
                post(getPostUri(getState(), request), request)
                    .then(response => {
                        dispatch({ type: actionNames.FINISHED, response: response });
                        callback && callback((response as unknown) as Response);
                    })
                    .catch((error: string) => dispatch({ type: actionNames.FAILED, error: error }));
            }
        }
    };

    return (state: PostResource<Request, Response> = initialState, action: Action): PostResource<Request, Response> => {
        switch (action.type) {
            case actionNames.INITIALIZE:
                return initialState;
            case actionNames.POSTING:
                return {
                    ...state,
                    status: PostStatus.POSTING,
                    payload: (action as PostAction<Request, Response>).payload
                } as PostingPostResource<Request, Response>;
            case actionNames.FINISHED:
                return {
                    ...state,
                    status: PostStatus.SUCCESS,
                    response: (action as FinishedPostAction<Request, Response>).response
                } as FinishedPostResource<Request, Response>;
            case actionNames.FAILED:
                const failedAction = action as FailAction<Request, Response>;
                loggEvent('Post-Failed', resourceNavn);
                loggError(new Error('Post-Failed in ' + resourceNavn), failedAction.error, {
                    request: (state as FailedPostResource<Request, Response>).payload
                });
                return {
                    ...state,
                    status: PostStatus.FAIL,
                    error: failedAction.error
                } as FailedPostResource<Request, Response>;
            default:
                return state;
        }
    };
}

export default createPostResourceReducerAndActions;
