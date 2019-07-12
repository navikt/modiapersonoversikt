const SECONDS: number = 1000;
const MINUTES: number = 60 * SECONDS;
const MAX_RETRIES: number = 30;

export enum Status {
    INIT,
    OPEN,
    CLOSE,
    REFRESH
}

export interface Listeners {
    onMessage(event: MessageEvent): void;
    onOpen?(event: Event): void;
    onError?(event: Event): void;
    onClose?(event: CloseEvent): void;
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
    private wsUrl: string;
    private listeners: Listeners;
    private connection?: WebSocket;
    private resettimer?: number | null;
    private retrytimer?: number | null;
    private retryCounter: number = 0;
    private debug: boolean = false;

    constructor(wsUrl: string, listeners: Listeners) {
        this.wsUrl = wsUrl;
        this.listeners = listeners;
        this.status = Status.INIT;
    }

    public open() {
        if (this.status === Status.CLOSE) {
            this.print('Stopping creation of WS, since it is closed');
            return;
        }

        this.connection = new WebSocket(this.wsUrl);
        this.connection.addEventListener('open', this.onWSOpen.bind(this));
        this.connection.addEventListener('message', this.onWSMessage.bind(this));
        this.connection.addEventListener('error', this.onWSError.bind(this));
        this.connection.addEventListener('close', this.onWSClose.bind(this));
    }

    public close() {
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

    private onWSOpen(event: Event) {
        this.print('open', event);
        this.clearResetTimer();
        this.clearRetryTimer();

        const delay = createDelay(45 * MINUTES);
        this.print('Creating resettimer', delay);

        this.resettimer = window.setTimeout(() => {
            this.status = Status.REFRESH;
            if (this.connection) {
                this.connection.close();
            }
        }, delay);

        this.status = Status.OPEN;

        if (this.listeners.onOpen) {
            this.listeners.onOpen(event);
        }
    }

    private onWSMessage(event: MessageEvent) {
        this.print('message', event);
        this.listeners.onMessage(event);
    }

    private onWSError(event: Event) {
        this.print('error', event);
        if (this.listeners.onError) {
            this.listeners.onError(event);
        }
    }

    private onWSClose(event: CloseEvent) {
        this.print('close', event);
        if (this.status === Status.REFRESH) {
            this.open();
            return;
        }

        if (this.status !== Status.CLOSE) {
            const delay = createRetrytime(this.retryCounter++);
            this.print('Creating retrytimer', delay);

            this.retrytimer = setTimeout(this.open.bind(this), delay);
        }
        if (this.listeners.onClose) {
            this.listeners.onClose(event);
        }
    }

    private clearResetTimer() {
        if (this.resettimer) {
            clearTimeout(this.resettimer);
        }
        this.resettimer = null;
    }

    private clearRetryTimer() {
        if (this.retrytimer) {
            clearTimeout(this.retrytimer);
        }
        this.retrytimer = null;
        this.retryCounter = 0;
    }

    private print(...args: any[]) {
        if (this.debug) {
            console.log(...args); // tslint:disable-line
        }
    }
}

export default WebSocketImpl;
