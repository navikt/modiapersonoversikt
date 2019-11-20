import useFetch, { Config, Status } from '@nutgaard/use-fetch';
import { useEffect } from 'react';
import { loggEvent } from '../frontendLogger';
import { usePrevious } from '../customHooks';

export function useFetchWithLog<TYPE>(
    url: string,
    loggerLocation: string,
    options?: RequestInit,
    loggerExtraTag?: string,
    config?: Config
) {
    const result = useFetch<TYPE>(url, options, config);
    const status = result.status;
    const prevStatus = usePrevious(status);
    useEffect(() => {
        if (prevStatus === undefined && status === Status.PENDING) {
            loggEvent('Fetch', loggerLocation, { type: loggerExtraTag });
        } else if (prevStatus === Status.PENDING && status === Status.ERROR) {
            loggEvent('Fetch-Failed', loggerLocation, { type: loggerExtraTag });
        } else if (prevStatus !== Status.RELOADING && status === Status.RELOADING) {
            loggEvent('Re-fetch', loggerLocation, { type: loggerExtraTag });
        }
    }, [status, prevStatus, loggerLocation, loggerExtraTag]);

    return result;
}
