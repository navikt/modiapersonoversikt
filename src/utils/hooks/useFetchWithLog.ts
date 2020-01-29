import useFetch, { Config, Status } from '@nutgaard/use-fetch';
import { useEffect } from 'react';
import { loggError, loggEvent } from '../logger/frontendLogger';
import { usePrevious } from '../customHooks';
import { useTimer } from './useTimer';

function getFetchOkMessage(prevStatus: Status) {
    switch (prevStatus) {
        case Status.PENDING:
            return 'Fetch';
        case Status.RELOADING:
            return 'Re-Fetch';
        default:
            return 'Unhandeled-Case';
    }
}

export function useFetchWithLog<TYPE>(url: string, loggerLocation: string, options?: RequestInit, config?: Config) {
    const getTime = useTimer();
    const result = useFetch<TYPE>(url, options, config);
    const prevStatus = usePrevious(result.status);
    useEffect(() => {
        if (prevStatus === undefined) {
            return;
        }
        if ([404, 403].includes(result.statusCode)) {
            return;
        }
        if (prevStatus !== Status.ERROR && result.status === Status.ERROR) {
            loggError(result.error, `Kunne ikke fetche data på ${url}. ${result.error.message}`, undefined, {
                action: 'Fetch-Failed',
                location: loggerLocation
            });
            return;
        }
        if (prevStatus !== Status.OK && result.status === Status.OK) {
            loggEvent(getFetchOkMessage(prevStatus), loggerLocation, undefined, { ms: getTime() });
            return;
        }
    }, [result, url, prevStatus, loggerLocation, getTime]);

    return result;
}
