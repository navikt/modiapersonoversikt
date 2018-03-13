export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    OK = 'OK',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR'
}

export interface Loading {
    type: STATUS.PENDING;
}

export interface FetchSuccess<T> {
    type: string;
    data: T;
}

export interface FetchError {
    type: STATUS.ERROR;
    error: string;
}

export type RestActions<T> =
    | Loading
    | FetchSuccess<T>
    | FetchError
    ;
