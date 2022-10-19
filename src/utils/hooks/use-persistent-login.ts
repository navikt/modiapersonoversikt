import { useEffect, useMemo, useRef, useState } from 'react';
import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

const debug = window.location.search.includes('utloggings-info');
const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;

const RECALC_LOGIN_STATUS_INTERVAL_IN_MS = 30 * SECOND_IN_MS;
const INACTIVITY_LIMIT_IN_MS = 10 * MINUTE_IN_MS;
const PREEMPTIVE_REFRESH_TIME_IN_MS = 120 * SECOND_IN_MS;
const ESTIMATED_EXPIRATION_IN_MS = 3600 * SECOND_IN_MS;

export type AuthIntropectionDTO = { expirationDate: number };
export const INVALID_EXPIRATION_DATE = -1;

class ActivityMonitor {
    private lastActivity: number = new Date().getTime();

    public update() {
        this.lastActivity = new Date().getTime();
    }

    public timeSinceLastActivity(): number {
        return new Date().getTime() - this.lastActivity;
    }
}

function timeToExpiration(auth: AuthIntropectionDTO): number {
    const expirationDate = auth.expirationDate;
    if (expirationDate === INVALID_EXPIRATION_DATE) {
        return ESTIMATED_EXPIRATION_IN_MS;
    }
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
function useTokenRefresher(auth: UseQueryResult<AuthIntropectionDTO, FetchError>) {
    const timerRef = useRef<number>(0);
    const activityMonitor = useActivityMonitor();

    useEffect(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = 0;
        }

        if (auth.status === 'success') {
            const timeToRefresh = timeToExpiration(auth.data);

            if (timeToRefresh > 0) {
                debug && console.debug('Setting up activity-check in', timeToRefresh - PREEMPTIVE_REFRESH_TIME_IN_MS);
                timerRef.current = window.setTimeout(() => {
                    debug &&
                        console.debug(
                            'refreshing token if not inactive. Activity: ',
                            activityMonitor.timeSinceLastActivity() < INACTIVITY_LIMIT_IN_MS
                        );
                    if (activityMonitor.timeSinceLastActivity() < INACTIVITY_LIMIT_IN_MS) {
                        auth.refetch();
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
function useLoginState(auth: UseQueryResult<AuthIntropectionDTO, FetchError>) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    useEffect(() => {
        let intervalId = 0;
        if (auth.data) {
            intervalId = window.setInterval(() => {
                const timeLeft = timeToExpiration(auth.data);
                debug && console.debug('recalculating loginstatus', timeLeft);
                setIsLoggedIn(timeLeft > 0);
            }, RECALC_LOGIN_STATUS_INTERVAL_IN_MS);
        }

        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [auth, setIsLoggedIn]);

    return isLoggedIn;
}

export enum ErrorReason {
    INVALID_EXPIRATION_DATE = 'INVALID_EXP_DATE',
    FETCH_ERROR = 'FETCH_ERROR'
}
function useErrorHandling(auth: UseQueryResult<AuthIntropectionDTO, FetchError>): ErrorReason | undefined {
    if (auth.isError) {
        return ErrorReason.FETCH_ERROR;
    } else if (auth.data && auth.data.expirationDate === INVALID_EXPIRATION_DATE) {
        return ErrorReason.INVALID_EXPIRATION_DATE;
    }
    return undefined;
}
const authResource = {
    useFetch(): UseQueryResult<AuthIntropectionDTO, FetchError> {
        return useQuery(['auth'], () => get(`${apiBaseUri}/tilgang/auth`));
    }
};

export type PersistentLoginState = { isLoggedIn: boolean; errorStatus?: ErrorReason };
export default function usePersistentLogin(): PersistentLoginState {
    debug && console.debug('Using debugging of persistent-loging');

    const auth = authResource.useFetch();
    const isLoggedIn = useLoginState(auth);
    const errorStatus = useErrorHandling(auth);
    useTokenRefresher(auth);

    return useMemo(
        () => ({
            isLoggedIn,
            errorStatus
        }),
        [isLoggedIn, errorStatus]
    );
}
