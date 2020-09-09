import { useEffect, useMemo, useRef, useState } from 'react';
import useFetch, { FetchResult, hasData, hasError, Status } from '@nutgaard/use-fetch';
import { WithData } from '@nutgaard/use-async';
import { apiBaseUri, includeCredentials } from '../../api/config';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

const debug = window.location.search.includes(FeatureToggles.UtloggingsInfo);
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

function timeToExpiration(auth: WithData<AuthIntropectionDTO>): number {
    const expirationDate = auth.data.expirationDate;
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
function useTokenRefresher(active: boolean, auth: FetchResult<AuthIntropectionDTO>) {
    const timerRef = useRef<number>(0);
    const activityMonitor = useActivityMonitor();

    useEffect(() => {
        if (!active) {
            return;
        }
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = 0;
        }

        if (auth.status === Status.OK) {
            const timeToRefresh = timeToExpiration(auth);

            if (timeToRefresh > 0) {
                debug && console.debug('Setting up activity-check in', timeToRefresh - PREEMPTIVE_REFRESH_TIME_IN_MS);
                timerRef.current = window.setTimeout(() => {
                    debug &&
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
    }, [active, auth, timerRef, activityMonitor]);
}

/**
 * Periodically (`RECALC_LOGIN_STATUS_INTERVAL_IN_MS`) compare current time with accessToken expiration,
 * and return whether or not user is currently logged in.
 */
function useLoginState(active: boolean, auth: FetchResult<AuthIntropectionDTO>) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    useEffect(() => {
        if (!active) {
            return;
        }
        let intervalId = 0;
        if (hasData(auth)) {
            intervalId = window.setInterval(() => {
                const timeLeft = timeToExpiration(auth);
                debug && console.debug('recalculating loginstatus', timeLeft);
                setIsLoggedIn(timeLeft > 0);
            }, RECALC_LOGIN_STATUS_INTERVAL_IN_MS);
        }

        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [active, auth, setIsLoggedIn]);

    return isLoggedIn;
}

export enum ErrorReason {
    INVALID_EXPIRATION_DATE = 'INVALID_EXP_DATE',
    FETCH_ERROR = 'FETCH_ERROR'
}
function useErrorHandling(active: boolean, auth: FetchResult<AuthIntropectionDTO>): ErrorReason | undefined {
    if (!active) {
        return undefined;
    } else if (hasError(auth)) {
        return ErrorReason.FETCH_ERROR;
    } else if (hasData(auth) && auth.data.expirationDate === INVALID_EXPIRATION_DATE) {
        return ErrorReason.INVALID_EXPIRATION_DATE;
    }
    return undefined;
}

export type PersistentLoginState = { isLoggedIn: boolean; errorStatus?: ErrorReason };
export default function usePersistentLogin(): PersistentLoginState {
    debug && console.debug('Using debugging of persistent-loging');

    const active = useFeatureToggle(FeatureToggles.UtloggingsInfo).isOn ?? false;
    const auth = useFetch<AuthIntropectionDTO>(`${apiBaseUri}/tilgang/auth`, includeCredentials, { lazy: !active });
    const isLoggedIn = useLoginState(active, auth);
    const errorStatus = useErrorHandling(active, auth);
    useTokenRefresher(active, auth);

    return useMemo(
        () => ({
            isLoggedIn,
            errorStatus
        }),
        [isLoggedIn, errorStatus]
    );
}
