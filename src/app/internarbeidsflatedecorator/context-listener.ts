import WebSocketImpl from './websocket-impl';

export enum EnhetConnectionState {
    CONNECTED = 'connected',
    NOT_CONNECTED = 'not_connected',
    FAILED = 'failed'
}

enum EventMessages {
    ESTABLISHED = 'Connection Established',
    PING = 'ping!',
    NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
    NY_AKTIV_BRUKER = 'NY_AKTIV_BRUKER'
}

export enum EnhetContextEventNames {
    CONNECTION_STATE_CHANGED = 'connection_state_changed',
    NY_AKTIV_ENHET = 'ny_aktiv_enhet',
    NY_AKTIV_BRUKER = 'ny_aktiv_bruker'
}

interface ConnectionStateChanged {
    type: EnhetContextEventNames.CONNECTION_STATE_CHANGED;
    state: EnhetConnectionState;
}

interface NyContext {
    type: EnhetContextEventNames.NY_AKTIV_ENHET | EnhetContextEventNames.NY_AKTIV_BRUKER;
}

export type EnhetContextEvent = ConnectionStateChanged | NyContext;

export default class EnhetContextListener {
    private connection: WebSocketImpl;
    private callback: (event: EnhetContextEvent) => void;

    constructor(uri: string, cb: (action: EnhetContextEvent) => void) {
        this.callback = cb;
        this.connection = new WebSocketImpl(uri, {
            onClose: this.onClose.bind(this),
            onError: this.onError.bind(this),
            onMessage: this.onMessage.bind(this),
            onOpen: this.onOpen.bind(this)
        });
        this.connection.open();
    }

    public close() {
        this.connection.close();
    }

    private onOpen() {
        this.callback({
            state: EnhetConnectionState.CONNECTED,
            type: EnhetContextEventNames.CONNECTION_STATE_CHANGED
        });
    }

    private onMessage(event: MessageEvent) {
        if (event.data === EventMessages.NY_AKTIV_ENHET) {
            this.callback({ type: EnhetContextEventNames.NY_AKTIV_ENHET });
        } else if (event.data === EventMessages.NY_AKTIV_BRUKER) {
            this.callback({ type: EnhetContextEventNames.NY_AKTIV_BRUKER });
        }
    }

    private onError() {
        this.callback({
            state: EnhetConnectionState.FAILED,
            type: EnhetContextEventNames.CONNECTION_STATE_CHANGED
        });
    }

    private onClose() {
        this.callback({
            state: EnhetConnectionState.NOT_CONNECTED,
            type: EnhetContextEventNames.CONNECTION_STATE_CHANGED
        });
    }
}
