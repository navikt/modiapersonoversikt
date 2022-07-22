import { useCallback, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';
import { loggError } from '../../../utils/logger/frontendLogger';
import WebSocketImpl from '../../../utils/websocket-impl';
import { retryAsync } from '../../../utils/retry';

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

async function asyncDraftWS(): Promise<WebSocketImpl> {
    return retryAsync(3, async () => {
        const uuid: string = await fetch(`/modiapersonoversikt-draft/api/generate-uid`).then((resp) => resp.text());
        const loc = window.location;
        const ws = new WebSocketImpl(`wss://${uuid}@${loc.host}/modiapersonoversikt-draft/api/draft/ws`, {
            onClose(event: CloseEvent, connection: WebSocketImpl) {
                connection.close();
                throw Error(`Retry after error code: ${event.code}`);
            }
        });
        ws.open();

        // Add delay to allow closing to happen
        await new Promise((resolve) => setTimeout(resolve, 500));

        return ws;
    });
}

function useDraftWS(context: DraftContext, ifPresent: (draft: Draft) => void = () => {}): DraftSystem {
    const wsRef = useRef<WebSocketImpl>();
    useEffect(() => {
        const asyncWs = asyncDraftWS();
        asyncWs.catch((error) => console.error(error));
        asyncWs.then((ws) => {
            wsRef.current = ws;
        });

        return () => {
            asyncWs.then((ws) => {
                ws.close();
                wsRef.current = undefined;
            });
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
    // const update = useCallback((content: string) => {
    //     const data: WsEvent = { type: "UPDATE", context, content };
    //     wsRef.current?.send(JSON.stringify(data))
    // }, [context]);

    const remove = useCallback(() => {
        const data: WsEvent = { type: 'DELETE', context, content: null };
        wsRef.current?.send(JSON.stringify(data));
    }, [context]);

    useEffect(() => {
        const queryParams = Object.entries(context)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        fetch(`/modiapersonoversikt-draft/api/draft?exact=true&${queryParams}`)
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

export function useDraft(context: DraftContext, ifPresent: (draft: Draft) => void = () => {}): DraftSystem {
    const update = useMemo(
        () =>
            debounce((content: string) => {
                fetch('/modiapersonoversikt-draft/api/draft', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content, context })
                }).catch((error: Error) => {
                    loggError(error, 'Feil ved oppdatering av draft', { context });
                });
            }, 500),
        [context]
    );

    const remove = useCallback(() => {
        fetch('/modiapersonoversikt-draft/api/draft', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(context)
        }).catch((error: Error) => {
            loggError(error, 'Feil ved sletting av draft', { context });
        });
    }, [context]);

    useEffect(() => {
        const queryParams = Object.entries(context)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        fetch(`/modiapersonoversikt-draft/api/draft?exact=true&${queryParams}`)
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

    return useMemo(
        () => ({
            update,
            remove
        }),
        [update, remove]
    );
}

export default useDraftWS;
