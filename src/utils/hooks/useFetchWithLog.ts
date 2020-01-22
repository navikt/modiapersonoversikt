import useFetch, { Config, Status } from '@nutgaard/use-fetch';
import { useEffect } from 'react';
import { loggError, loggEvent } from '../frontendLogger';
import { usePrevious } from '../customHooks';

export function useFetchWithLog<TYPE>(
    url: string,
    loggerLocation: string,
    options?: RequestInit,
    loggerExtraTag?: string,
    config?: Config
) {
    const result = useFetch<TYPE>(url, options, config);
    const prevStatus = usePrevious(result.status);
    useEffect(() => {
        if (prevStatus !== Status.PENDING && result.status === Status.PENDING) {
            loggEvent('Fetch', loggerLocation, { type: loggerExtraTag });
        } else if (prevStatus !== Status.ERROR && result.status === Status.ERROR) {
            if ([404, 403].includes(result.statusCode)) {
                return;
            }
            loggEvent('Fetch-Failed', loggerLocation, { type: loggerExtraTag });
            loggError(result.error, `Kunne ikke fetche data på ${url}. ${result.error.message}`, undefined, {
                type: 'Fetch-Failed'
            });
        } else if (prevStatus !== Status.RELOADING && result.status === Status.RELOADING) {
            loggEvent('Re-fetch', loggerLocation, { type: loggerExtraTag });
        }
    }, [result, url, prevStatus, loggerLocation, loggerExtraTag]);

    return result;
}
