export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    NOT_FOUND = 'NOT_FOUND',
    RELOADING = 'RELOADING',
    FAILED = 'FAILED',
    FORBIDDEN = 'FORBIDDEN'
}
export type Pending<T> = { pending: true } | { pending: false; data: T };
