import { FetchResult, Status } from '@nutgaard/use-fetch';
import { useEffect } from 'react';
import { loggEvent } from '../frontendLogger';
import { usePrevious } from '../customHooks';

export function useFetchLogger(data: FetchResult<any>, location: string, type?: string) {
    const status = data.status;
    const prevStatus = usePrevious(status);
    useEffect(() => {
        if (prevStatus === undefined && status === Status.PENDING) {
            loggEvent('Fetch', location, { type: type });
        } else if (prevStatus === Status.PENDING && status === Status.ERROR) {
            loggEvent('Fetch-Failed', location, { type: type });
        } else if (prevStatus !== Status.RELOADING && status === Status.RELOADING) {
            loggEvent('Re-fetch', location, { type: type });
        }
    }, [status, prevStatus, location, type]);
}
