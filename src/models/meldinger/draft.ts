import type { Dayjs } from 'dayjs';

export interface DraftContext {
    [key: string]: string;
}

export interface Draft {
    owner: string;
    content: string;
    context: DraftContext;
    created: string;
}

export type DraftState = {
    ok: boolean;
    loading: boolean;
    saveTime: Dayjs | null;
};

export interface WsEvent {
    type: 'UPDATE' | 'DELETE';
    context: DraftContext;
    content: string | null;
}

export interface WsConfirmation {
    type: 'OK';
    time: string;
}
