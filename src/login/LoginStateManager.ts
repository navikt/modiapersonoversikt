import { ActivityMonitor } from './AcitivityMonitor';
import { INACTIVITY_LIMIT_IN_MS, PREEMPTIVE_REFRESH_TIME_IN_MS, RECALC_LOGIN_STATUS_INTERVAL_IN_MS } from './constants';
import { timeToExpiration } from './timeToExpiration';
import type { AuthIntropectionDTO } from './use-persistent-ww-login';

export class LoginStateManager {
    private timeout: ReturnType<typeof setTimeout> | null = null;
    private interval: ReturnType<typeof setInterval> | null = null;
    private activityMonitor = new ActivityMonitor();
    private _refreshToken?: () => void;
    private _onLoginStateUpdate?: (props: { isLoggedIn: boolean }) => void;

    initialize = (refreshToken: () => void, onLoginStateUpdate: (props: { isLoggedIn: boolean }) => void) => {
        this._refreshToken = refreshToken;
        this._onLoginStateUpdate = onLoginStateUpdate;
    };

    private setupTokenRefresher = (timeToRefresh: number) => {
        this.timeout = this.getTokenRefreshTimeout(this.activityMonitor, timeToRefresh);
    };

    private get refreshToken() {
        if (!this._refreshToken) {
            throw new Error('[LoginStateManager] var ikke initialisert med en metode for å refreshe token');
        }
        return this._refreshToken;
    }

    private get onLoginStateUpdate() {
        if (!this._onLoginStateUpdate) {
            throw new Error('[LoginStateManager] var ikke initialisert med en metode for å sende login oppdateringer');
        }
        return this._onLoginStateUpdate;
    }

    private getTokenRefreshTimeout = (activityMonitor: ActivityMonitor, timeToExpiration: number) => {
        return setTimeout(() => {
            if (activityMonitor.timeSinceLastActivity() < INACTIVITY_LIMIT_IN_MS) {
                if (!this.refreshToken) {
                    throw new Error('[LoginStateManager] Var ikke initialisert med ');
                }
                if (this.refreshToken) {
                    this.refreshToken();
                }
            }
        }, timeToExpiration - PREEMPTIVE_REFRESH_TIME_IN_MS);
    };

    private getLoginStateInterval = (auth: AuthIntropectionDTO) => {
        return setInterval(() => {
            const timeLeft = timeToExpiration(auth.expirationDate);
            if (this.onLoginStateUpdate) {
                this.onLoginStateUpdate({ isLoggedIn: timeLeft > 0 });
            }
        }, RECALC_LOGIN_STATUS_INTERVAL_IN_MS);
    };

    private onAuthStateUpdate = (auth: AuthIntropectionDTO) => {
        this.stopTokenRefresher();
        const timeToRefresh = timeToExpiration(auth.expirationDate);
        if (timeToRefresh === 0) {
            if (this.refreshToken) {
                this.refreshToken();
            }
            return;
        }
        this.setupTokenRefresher(timeToRefresh);
    };

    private setupLoginStateNotifier = (auth: AuthIntropectionDTO) => {
        this.stopLoginStateNotifier();
        this.interval = this.getLoginStateInterval(auth);
    };

    private stopTokenRefresher = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };

    private stopLoginStateNotifier = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };

    onUserActive = () => {
        this.activityMonitor.update();
    };

    onUpdate = (auth: AuthIntropectionDTO) => {
        this.onAuthStateUpdate(auth);
        this.setupLoginStateNotifier(auth);
    };

    stopWork = () => {
        this.stopTokenRefresher();
        this.stopLoginStateNotifier();
    };
}
