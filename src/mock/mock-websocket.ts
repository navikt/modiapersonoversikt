type WebSocketIsh = Pick<WebSocket, 'close' | 'send' | 'addEventListener'>;

class VoidWebSocket {
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
}
export default class MockWebsocket implements WebSocketIsh {
    private openEventListeners: Array<(this: WebSocket, ev: WebSocketEventMap['open']) => any> = [];
    private closeEventListeners: Array<(this: WebSocket, ev: WebSocketEventMap['close']) => any> = [];
    private messageEventListeners: Array<(this: WebSocket, ev: WebSocketEventMap['message']) => any> = [];
    private errorEventListeners: Array<(this: WebSocket, ev: WebSocketEventMap['error']) => any> = [];
    private openEvent: Array<WebSocketEventMap['open']> = [];
    private closeEvent: Array<WebSocketEventMap['close']> = [];
    private static draftConnectionAttempt: number = 0;

    constructor(url: string) {
        this.openEvent.push(new Event('open'));
        if (MockWebsocket.draftConnectionAttempt++ < 2) {
            this.closeEvent.push(new CloseEvent('close', { code: 4010, reason: 'Unauthorized' } as CloseEventInit));
        }
    }

    close(code?: number, reason?: string): void {
        this.closeEvent.push(new CloseEvent('close', { code, reason } as CloseEventInit));
    }

    send(data: string | ArrayBuffer | ArrayBufferView | Blob): void {
        console.log('sending WS data', data);
    }

    addEventListener<K extends keyof WebSocketEventMap>(
        type: K,
        listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void {
        switch (type) {
            case 'message':
                this.messageEventListeners.push(listener as any);
                break;
            case 'error':
                this.errorEventListeners.push(listener as any);
                break;
            case 'open':
                this.openEventListeners.push(listener as any);
                break;
            case 'close':
                this.closeEventListeners.push(listener as any);
                break;
        }
        if (type === 'open') {
            this.openEvent.forEach((event) => listener.call(this as unknown as WebSocket, event as any));
        } else if (type === 'close') {
            this.closeEvent.forEach((event) => listener.call(this as unknown as WebSocket, event as any));
        }
    }

    static wsOriginal: WebSocket = (window as any).WebSocket;
    static setup() {
        (window as any).WebSocket = (url: string) => {
            if (url.includes('/api/draft/ws')) {
                return new MockWebsocket(url);
            } else if (url.includes('veilederflatehendelser')) {
                return new VoidWebSocket();
            } else {
                // @ts-ignore
                return new MockWebsocket.wsOriginal(url);
            }
        };
    }
    static restore() {
        (window as any).WebSocket = MockWebsocket.wsOriginal;
    }
}
