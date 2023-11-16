export type OutgoingMessageType = 'LOGIN_STATE_UPDATE' | 'REFRESH_TOKEN';
export type IncommingMessageType = 'AUTH_STATE_UPDATE' | 'STOP_WORKER' | 'USER_ACTIVE';
export interface WWMessage<T> {
    type: IncommingMessageType | OutgoingMessageType;
    payload: T;
}
