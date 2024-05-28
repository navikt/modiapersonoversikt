const SECONDS: number = 1000;
const MINUTES: number = 60 * SECONDS;
const MAX_RETRIES: number = 30;

export enum Status {
    INIT,
    OPEN,
    CLOSE,
    REFRESH
}

interface Listeners {
    onMessage?(event: MessageEvent, connection: WebSocketImpl): void;
    onOpen?(event: Event, connection: WebSocketImpl): void;
    onError?(event: Event, connection: WebSocketImpl): void;
    onClose?(event: CloseEvent, connection: WebSocketImpl): void;
}

function fuzzy(min: number, max: number): number {
    const diff = max - min;
    const rnd = Math.round(Math.random() * diff);
    return min + rnd;
}

function createDelay(basedelay: number): number {
    return basedelay + fuzzy(5 * SECONDS, 15 * SECONDS);
}

function createRetrytime(tryCount: number): number {
    if (tryCount === MAX_RETRIES) {
        return Number.MAX_SAFE_INTEGER;
    }

    const basedelay = Math.min(Math.pow(2, tryCount), 180) * SECONDS;
    return basedelay + fuzzy(5 * SECONDS, 15 * SECONDS);
}

class WebSocketImpl {
    private status: Status;
    private readonly wsUrl: string | ((ws: WebSocketImpl) => Promise<string>);
    private readonly listeners: Listeners;
    private connection?: WebSocket;
    private resettimer?: number | null;
    private retrytimer?: number | null;
    private retryCounter: number = 0;

    constructor(wsUrl: string | ((ws: WebSocketImpl) => Promise<string>), listeners: Listeners) {
        this.wsUrl = wsUrl;
        this.listeners = listeners;
        this.status = Status.INIT;
    }

    public async open() {
        if (this.status === Status.CLOSE) {
            WebSocketImpl.print('Stopping creation of WS, since it is closed');
            return;
        }
        const wsUrl = typeof this.wsUrl === 'string' ? this.wsUrl : await this.wsUrl(this);
        if (wsUrl !== '\u0000') {
            WebSocketImpl.print('Opening WS', wsUrl);
            this.connection = new WebSocket(wsUrl);
            this.connection.addEventListener('open', this.onWSOpen.bind(this));
            this.connection.addEventListener('message', this.onWSMessage.bind(this));
            this.connection.addEventListener('error', this.onWSError.bind(this));
            this.connection.addEventListener('close', this.onWSClose.bind(this));
        }
    }

    public close() {
        WebSocketImpl.print('Closing WS', this.wsUrl);
        this.clearResetTimer();
        this.clearRetryTimer();
        this.status = Status.CLOSE;
        if (this.connection) {
            this.connection.close();
        }
    }

    public getStatus() {
        return this.status;
    }

    public send(data: string | ArrayBuffer | ArrayBufferView | Blob): void {
        if (this.connection) {
            this.connection.send(data);
        }
    }

    private onWSOpen(event: Event) {
        WebSocketImpl.print('open', event);
        this.clearResetTimer();
        this.clearRetryTimer();

        const delay = createDelay(45 * MINUTES);
        WebSocketImpl.print('Creating resettimer', delay);

        this.resettimer = window.setTimeout(() => {
            this.status = Status.REFRESH;
            if (this.connection) {
                this.connection.close();
            }
        }, delay);

        this.status = Status.OPEN;

        if (this.listeners.onOpen) {
            this.listeners.onOpen(event, this);
        }
    }

    private onWSMessage(event: MessageEvent) {
        WebSocketImpl.print('message', event);
        if (this.listeners.onMessage) {
            this.listeners.onMessage(event, this);
        }
    }

    private onWSError(event: Event) {
        WebSocketImpl.print('error', event);
        if (this.listeners.onError) {
            this.listeners.onError(event, this);
        }
    }

    private async onWSClose(event: CloseEvent) {
        WebSocketImpl.print('close', event);
        if (this.status === Status.REFRESH) {
            await this.open();
            return;
        }

        if (this.status !== Status.CLOSE) {
            const delay = createRetrytime(this.retryCounter++);
            WebSocketImpl.print('Creating retrytimer', delay);

            this.retrytimer = window.setTimeout(() => this.open(), delay);
        }
        if (this.listeners.onClose) {
            this.listeners.onClose(event, this);
        }
    }

    private clearResetTimer() {
        if (this.resettimer) {
            window.clearTimeout(this.resettimer);
        }
        this.resettimer = null;
    }

    private clearRetryTimer() {
        if (this.retrytimer) {
            window.clearTimeout(this.retrytimer);
        }
        this.retrytimer = null;
        this.retryCounter = 0;
    }

    public static Codes = {
        NORMAL: 1000,
        GOING_AWAY: 1001
    };

    private static print(...args: Parameters<typeof console.log>) {
        if (import.meta.env.VITE_MOCK_ENABLED === 'true') {
            console.log('WS:', ...args);
        }
    }
}

export default WebSocketImpl;
