import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { type FetchError, get } from '../api/api';
import { apiBaseUri } from '../api/config';
import { persistentLoginWebworkerFactory } from './persistentLoginWebWorkerFactory';

enum ErrorReason {
    INVALID_EXPIRATION_DATE = 'INVALID_EXP_DATE',
    FETCH_ERROR = 'FETCH_ERROR'
}
export type AuthIntropectionDTO = { expirationDate: number };
const INVALID_EXPIRATION_DATE = -1;

export type PersistentLoginState = {
    isLoggedIn: boolean;
    errorStatus?: ErrorReason;
};

const authResource = {
    useFetch(): UseQueryResult<AuthIntropectionDTO, FetchError> {
        return useQuery({
            queryKey: ['auth'],
            queryFn: () => get(`${apiBaseUri}/tilgang/auth`)
        });
    }
};

const errorHandling = (auth: UseQueryResult<AuthIntropectionDTO, FetchError>): ErrorReason | undefined => {
    if (auth.isError) {
        return ErrorReason.FETCH_ERROR;
    }
    if (auth.data && auth.data.expirationDate === INVALID_EXPIRATION_DATE) {
        return ErrorReason.INVALID_EXPIRATION_DATE;
    }
    return undefined;
};

const useAuthStateLogin = (auth: UseQueryResult<AuthIntropectionDTO, FetchError>) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [webWorkerCom] = useState(() => {
        const worker = persistentLoginWebworkerFactory();
        worker.initialize(auth.refetch, ({ isLoggedIn }) => setIsLoggedIn(isLoggedIn));
        return worker;
    });

    useEffect(() => {
        if (webWorkerCom) {
            document.addEventListener('mousemove', webWorkerCom.onUserActive);
            document.addEventListener('keydown', webWorkerCom.onUserActive);
        }
        return () => {
            if (webWorkerCom) {
                document.removeEventListener('mousemove', webWorkerCom.onUserActive);
                document.removeEventListener('keydown', webWorkerCom.onUserActive);
            }
        };
    }, [webWorkerCom]);

    useEffect(() => {
        if (auth.status === 'success') {
            webWorkerCom.onAuthChange(auth.data);
            return;
        }
        if (auth.status === 'error') {
            setIsLoggedIn(false);
            webWorkerCom.stop();
        }
    }, [auth, webWorkerCom]);

    return isLoggedIn;
};

export const usePersistentWWLogin = (): PersistentLoginState => {
    const auth = authResource.useFetch();
    const errorStatus = errorHandling(auth);
    const isLoggedIn = useAuthStateLogin(auth);

    return useMemo(
        () => ({
            isLoggedIn,
            errorStatus
        }),
        [isLoggedIn, errorStatus]
    );
};
