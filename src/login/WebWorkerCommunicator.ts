import { AuthIntropectionDTO } from '../utils/hooks/use-persistent-login';
import { LoginStateManager } from './LoginStateManager';
import { META_URL } from './metaUrl';
import { WWMessage, OutgoingMessageType, IncommingMessageType } from './types';

export interface IWebWorkerCom {
    initialize: (refreshToken: () => void, onLoginStateUpdate: (props: { isLoggedIn: boolean }) => void) => void;
    onAuthChange: (newState: AuthIntropectionDTO) => void;
    stop: () => void;
    onUserActive: () => void;
}

export class WebWorkerCommunicator implements IWebWorkerCom {
    private worker: Worker;
    refreshToken?: () => void;
    onLoginStateUpdate?: (props: { isLoggedIn: boolean }) => void;

    constructor() {
        this.worker = new window.Worker(new URL('../loginWebWorker', META_URL));
    }

    initialize = (refreshToken: () => void, onLoginStateUpdate: (props: { isLoggedIn: boolean }) => void) => {
        this.refreshToken = refreshToken;
        this.onLoginStateUpdate = onLoginStateUpdate;
        this.worker.onmessage = (message: MessageEvent<WWMessage<any>>) => {
            const { type, payload } = message.data;
            this.onMessage(type as OutgoingMessageType, payload);
        };
    };

    private sendMessage = (type: IncommingMessageType, payload?: any) => {
        const message: WWMessage<any> = {
            type,
            payload
        };
        this.worker.postMessage(message);
    };

    private onMessage = (type: OutgoingMessageType, payload?: any) => {
        switch (type) {
            case 'REFRESH_TOKEN': {
                if (!this.refreshToken) {
                    throw new Error('WebWorker was not initialized before being called');
                }
                this.refreshToken();
                return;
            }
            case 'LOGIN_STATE_UPDATE': {
                if (!this.onLoginStateUpdate) {
                    throw new Error('WebWorker was not initialized before being called');
                }
                this.onLoginStateUpdate({ isLoggedIn: payload });
                return;
            }
        }
    };

    onUserActive = () => {
        this.sendMessage('USER_ACTIVE');
    };

    onAuthChange = (newState: AuthIntropectionDTO) => {
        this.sendMessage('AUTH_STATE_UPDATE', newState);
    };

    stop = () => this.sendMessage('STOP_WORKER');
}

export class NoWorkerCommunicator implements IWebWorkerCom {
    private loginStateManager = new LoginStateManager();

    initialize = (refreshToken: () => void, onLoginStateUpdate: (props: { isLoggedIn: boolean }) => void) => {
        this.loginStateManager.initialize(refreshToken, onLoginStateUpdate);
    };

    onAuthChange = (newState: AuthIntropectionDTO) => {
        this.loginStateManager.onUpdate(newState);
    };
    stop = () => {
        this.loginStateManager.stopWork();
    };

    onUserActive = () => {
        this.loginStateManager.onUserActive();
    };
}
