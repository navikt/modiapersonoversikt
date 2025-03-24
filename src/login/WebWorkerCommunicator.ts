import { LoginStateManager } from './LoginStateManager';
import type { IncommingMessageType, OutgoingMessageType, WWMessage } from './types';
import type { AuthIntropectionDTO } from './use-persistent-ww-login';

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

    constructor(worker: Worker) {
        this.worker = worker;
    }

    initialize = (refreshToken: () => void, onLoginStateUpdate: (props: { isLoggedIn: boolean }) => void) => {
        this.refreshToken = refreshToken;
        this.onLoginStateUpdate = onLoginStateUpdate;
        //biome-ignore lint/suspicious/noExplicitAny: biome migration
        this.worker.onmessage = (message: MessageEvent<WWMessage<any>>) => {
            const { type, payload } = message.data;
            this.onMessage(type as OutgoingMessageType, payload);
        };
    };

    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    private sendMessage = (type: IncommingMessageType, payload?: any) => {
        //biome-ignore lint/suspicious/noExplicitAny: biome migration
        const message: WWMessage<any> = {
            type,
            payload
        };
        this.worker.postMessage(message);
    };

    //biome-ignore lint/suspicious/noExplicitAny: biome migration
    private onMessage = (type: OutgoingMessageType, payload?: any) => {
        switch (type) {
            case 'REFRESH_TOKEN': {
                if (!this.refreshToken) {
                    throw new Error('WebWorker was not initialized before being called');
                }
                console.log(new Date().valueOf(), 'Refresh token message');
                this.refreshToken();
                return;
            }
            case 'LOGIN_STATE_UPDATE': {
                if (!this.onLoginStateUpdate) {
                    throw new Error('WebWorker was not initialized before being called');
                }
                console.log(new Date().valueOf(), 'Login state update');
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
