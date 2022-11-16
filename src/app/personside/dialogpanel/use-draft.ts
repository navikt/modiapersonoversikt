import { useCallback, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';
import { loggError, loggInfo } from '../../../utils/logger/frontendLogger';
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

interface DraftSystem {
    update(content: string): void;
    remove(): void;
}

interface WsEvent {
    type: 'UPDATE' | 'DELETE';
    context: DraftContext;
    content: string | null;
}

const okCloseCodes = Object.values(WebSocketImpl.Codes);

function useDraft(context: DraftContext, ifPresent: (draft: Draft) => void = () => {}): DraftSystem {
    const wsRef = useRef<WebSocketImpl>();
    useEffect(() => {
        const urlProvider = async (ws: WebSocketImpl) => {
            const response: Response = await fetch(`/modiapersonoversikt/proxy/modia-draft/api/generate-uid`);
            if (response.status === 401) {
                ws.close();
                return '\u0000';
            } else {
                const uuid: string = await response.json();
                const loc = window.location;
                return `wss://${loc.host}/modiapersonoversikt-draft/api/draft/ws/${uuid}`;
            }
        };
        wsRef.current = new WebSocketImpl(urlProvider, {
            onClose(event: CloseEvent, connection: WebSocketImpl) {
                if (okCloseCodes.includes(event.code)) {
                    loggInfo('WS lukket som normalt, kobler til på nytt');
                } else if (connection.getStatus() !== Status.CLOSE) {
                    loggError(new Error(`Retry after error code: ${event.code}`));
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
                const data: WsEvent = { type: 'UPDATE', context, content };
                wsRef.current?.send(JSON.stringify(data));
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

        fetch(`/modiapersonoversikt/proxy/modia-draft/api/draft?exact=true&${queryParams}`)
            .then((resp) => resp.json())
            .then((json: Array<Draft>) => {
                if (json.length > 0) {
                    ifPresent(json[0]);
                }
            })
            .catch((error: Error) => {
                loggError(error, 'Feil ved uthenting av draft', { context });
            });
    }, [context, ifPresent]);

    return useMemo(() => ({ update, remove }), [update, remove]);
}

export default useDraft;
