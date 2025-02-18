import dayjs, { type Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FetchError } from 'src/api/api';
import { getEnvFromHost } from 'src/utils/environment';
import { loggError, loggInfo } from 'src/utils/logger/frontendLogger';
import config from '../../../config';
import WebSocketImpl, { Status } from '../../../utils/websocket-impl';

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

interface DraftSystem {
    update(content: string): void;
    remove(): void;
    status: DraftState;
}

export interface WsEvent {
    type: 'UPDATE' | 'DELETE';
    context: DraftContext;
    content: string | null;
}

export interface WsConfirmation {
    type: 'OK';
    time: string;
}

const okCloseCodes = Object.values(WebSocketImpl.Codes);

const getWsUrl = () => {
    if (import.meta.env.VITE_DRAFT_URL_WS) return import.meta.env.VITE_DRAFT_URL_WS as string;
    if (import.meta.env.VITE_DRAFT_URL) return (import.meta.env.VITE_DRAFT_URL as string).replace('http', 'ws');
    if (config.draftWsUrl) return config.draftWsUrl;
    const env = getEnvFromHost();
    switch (env) {
        case 'prod':
            return 'wss://modiapersonoversikt-draft.intern.nav.no';
        default:
            return 'wss://modiapersonoversikt-draft.intern.dev.nav.no';
    }
};

const draftUrl = (import.meta.env.VITE_DRAFT_URL as string) ?? `${import.meta.env.BASE_URL}proxy/modia-draft`;

function useDraft(context: DraftContext, ifPresent: (draft: Draft) => void = () => {}): DraftSystem {
    const wsRef = useRef<WebSocketImpl>(undefined);
    const [lastConfirm, setLastConfirm] = useState<{
        ok: boolean;
        time: Date | null;
    }>({ ok: false, time: null });
    const [lastSent, setLastSent] = useState<Date | null>(null);
    const [timeout, setTimeoutVal] = useState(false);
    const timer = useRef<NodeJS.Timeout>(undefined);

    const DRAFT_TIMEOUT_SECONDS = 3;

    const status: DraftState = useMemo(() => {
        if (!lastSent) {
            return {
                loading: false,
                ok: lastConfirm.ok,
                saveTime: lastConfirm.time ? dayjs(lastConfirm.time) : null
            };
        }

        const sendTime = dayjs(lastSent);

        // Timeout
        if ((!lastConfirm.time || dayjs(lastConfirm.time).isBefore(lastSent)) && timeout) {
            return { loading: false, ok: false, saveTime: null };
        }

        const loading = !lastConfirm.time || sendTime.isAfter(lastConfirm.time);
        const ok = lastConfirm.time && lastConfirm.ok && dayjs(lastConfirm.time).isAfter(lastSent);

        return {
            loading: loading,
            ok: !!ok,
            saveTime: lastConfirm.time ? dayjs(lastConfirm.time) : null
        };
    }, [lastConfirm, lastSent, timeout]);

    useEffect(() => {
        const urlProvider = async (ws: WebSocketImpl) => {
            const response: Response = await fetch(`${draftUrl}/api/generate-uid`);
            if (!response.ok) {
                ws.close();
                return '\u0000';
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const uuid: string = await response.json();
            return `${getWsUrl()}/api/draft/ws/${uuid}`;
        };
        wsRef.current = new WebSocketImpl(urlProvider, {
            onClose(event: CloseEvent, connection: WebSocketImpl) {
                if (okCloseCodes.includes(event.code)) {
                    loggInfo('WS lukket som normalt, kobler til på nytt');
                } else if (connection.getStatus() !== Status.CLOSE) {
                    loggError(new Error(`Retry after error code: ${event.code}`));
                }
            },
            onMessage(event) {
                try {
                    const message = JSON.parse(event.data as string) as WsConfirmation;

                    if (message.type === 'OK' && message) {
                        let time = new Date(`${message.time}Z`);
                        if (time.toString() === 'Invalid Date') {
                            time = new Date(message.time);
                        }
                        setLastConfirm({ ok: true, time: time });
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });
        wsRef.current?.open();

        return () => {
            wsRef.current?.close();
            wsRef.current = undefined;
        };
    }, []);

    const update = useMemo(
        () =>
            debounce((content: string) => {
                setTimeoutVal(false);
                setLastSent(new Date());
                const data: WsEvent = { type: 'UPDATE', context, content };
                wsRef.current?.send(JSON.stringify(data));
                if (timer.current) {
                    clearTimeout(timer.current);
                }

                timer.current = setTimeout(() => setTimeoutVal(true), DRAFT_TIMEOUT_SECONDS * 1000);
            }, 500),
        [context]
    );

    const remove = useCallback(() => {
        const data: WsEvent = { type: 'DELETE', context, content: null };
        wsRef.current?.send(JSON.stringify(data));
    }, [context]);

    useEffect(() => {
        const queryParams = Object.entries(context)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        fetch(`${draftUrl}/api/draft?exact=true&${queryParams}`)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new FetchError(resp, 'Feil ved uthenting av draft');
            })
            .then((json: Array<Draft>) => {
                if (json.length > 0) {
                    ifPresent(json[0]);
                    setLastConfirm({ ok: true, time: new Date(`${json[0].created}Z`) });
                }
            })
            .catch((error: Error) => {
                loggError(error, 'Feil ved uthenting av draft', { context });
            });
    }, [context, ifPresent]);

    return { update, remove, status };
}

export default useDraft;
