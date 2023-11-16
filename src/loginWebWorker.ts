/* eslint-disable no-restricted-globals */
import { LoginStateManager } from './login/LoginStateManager';
import { IncommingMessageType, OutgoingMessageType } from './login/types';

const loginStateManager = new LoginStateManager();

const register = () => {
    console.log('Bruker webworker for å kontrollere inlogging');
    self.addEventListener('message', handleEventMessage);
};

const handleEventMessage = (event: MessageEvent<{ type: IncommingMessageType; payload: any }>) => {
    const { type, payload } = event.data;
    switch (type) {
        case 'STOP_WORKER':
            loginStateManager.stopWork();
            console.log('[loginWebWorker] Mottok melding: ', type);
            return;
        case 'AUTH_STATE_UPDATE':
            loginStateManager.onUpdate(payload);
            console.log(`[loginWebWorker] Mottok melding: ${type}, med: ${payload.expirationDate}`);
            return;
        case 'USER_ACTIVE':
            loginStateManager.onUserActive();
            return;
    }
};

const sendRefreshMessage = () => {
    sendMessage('REFRESH_TOKEN');
};

const sendIsLoggedIn = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    sendMessage('LOGIN_STATE_UPDATE', isLoggedIn);
};

const sendMessage = <T>(type: OutgoingMessageType, payload?: T) => {
    self.postMessage({ type, payload });
};

loginStateManager.initialize(sendRefreshMessage, sendIsLoggedIn);

register();
