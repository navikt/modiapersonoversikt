import { useEffect, useRef, useState } from 'react';
import useFetch, { FetchResult, hasData, Status } from '@nutgaard/use-fetch';
import { WithData } from '@nutgaard/use-async';
import { apiBaseUri } from '../../api/config';

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;

const RECALC_LOGIN_STATUS_INTERVAL_IN_MS = 30 * SECOND_IN_MS;
const INACTIVITY_LIMIT_IN_MS = 2 * MINUTE_IN_MS;
const PREEMPTIVE_REFRESH_TIME_IN_MS = 60 * SECOND_IN_MS;

export type AuthIntropectionDTO = { expirationDate: number };

class ActivityMonitor {
    private lastActivity: number = new Date().getTime();

    public update() {
        this.lastActivity = new Date().getTime();
    }

    public timeSinceLastActivity(): number {
        return new Date().getTime() - this.lastActivity;
    }
}

function timeToExpiration(auth: WithData<AuthIntropectionDTO>): number {
    const expirationDate = auth.data.expirationDate;
    const currentDate = new Date().getTime();
    return expirationDate - currentDate;
}

/**
 * Gather last time of user-interaction.
 * Uses a `ref` as we don't want the change to trigger effects to rerun
 */
function useActivityMonitor() {
    const lastActivity = useRef<ActivityMonitor>(new ActivityMonitor());

    useEffect(() => {
        const handler = () => {
            lastActivity.current.update();
        };
        document.addEventListener('keydown', handler);
        document.addEventListener('mousemove', handler);
        return () => {
            document.removeEventListener('keydown', handler);
            document.removeEventListener('mousemove', handler);
        };
    }, [lastActivity]);

    return lastActivity.current;
}

/**
 * Refreshes accesstoken `PREEMPTY_REFRESH_TIME_IN_MS` milliseconds before token expires
 * if a user-interactions happened within `INACTIVITY_LIMIT_IN_MS`.
 */
function useTokenRefresher(auth: FetchResult<AuthIntropectionDTO>) {
    const timerRef = useRef<number>(0);
    const activityMonitor = useActivityMonitor();

    useEffect(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = 0;
        }

        if (auth.status === Status.OK) {
            const timeToRefresh = timeToExpiration(auth);

            if (timeToRefresh > 0) {
                console.debug('Setting up activity-check in', timeToRefresh - PREEMPTIVE_REFRESH_TIME_IN_MS);
                timerRef.current = window.setTimeout(() => {
                    console.debug(
                        'refreshing token if not inactive. Activity: ',
                        activityMonitor.timeSinceLastActivity() < INACTIVITY_LIMIT_IN_MS
                    );
                    if (activityMonitor.timeSinceLastActivity() < INACTIVITY_LIMIT_IN_MS) {
                        auth.rerun();
                    }
                }, timeToRefresh - PREEMPTIVE_REFRESH_TIME_IN_MS);
            }
        }
    }, [auth, timerRef, activityMonitor]);
}

/**
 * Periodically (`RECALC_LOGIN_STATUS_INTERVAL_IN_MS`) compare current time with accessToken expiration,
 * and return whether or not user is currently logged in.
 */
function useLoginState(auth: FetchResult<AuthIntropectionDTO>) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    useEffect(() => {
        let intervalId = 0;
        if (hasData(auth)) {
            intervalId = window.setInterval(() => {
                const timeLeft = timeToExpiration(auth);
                console.debug('recalculating loginstatus', timeLeft);
                setIsLoggedIn(timeLeft > 0);
            }, RECALC_LOGIN_STATUS_INTERVAL_IN_MS);
        }

        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [auth, setIsLoggedIn]);

    console.debug('isLoggedIn', isLoggedIn);
    return isLoggedIn;
}

export default function usePersistentLogin(): boolean {
    const auth = useFetch<AuthIntropectionDTO>(`${apiBaseUri}/tilgang/auth`);
    const loginState = useLoginState(auth);
    useTokenRefresher(auth);

    return loginState;
}
