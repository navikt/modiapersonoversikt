import { useCallback, useEffect, useState } from 'react';
import { apiBaseUri } from '../../api/config';
import useInterval from './use-interval';
import useTimeout from './use-timeout';

/*
    IDToken refreshes 5min før det løpet ut.
    Men om saksbehandler har igjen 6minutter når hen laster siden, og bruker 10minutter på å skrive samtalereferat,
    så vil saksbehandler få 401 Unauthorized.

    For å utvide fornye token må det skje ett kall til modiapersonoversikt-api, vi gjør derfor det periodisk
    i en liten periode (hvert 4. minutt i 20 minutter) etter saksbehandler laster ny bruker.
 */
const MINUTTER = 60 * 1000;
function refreshToken() {
    fetch(`${apiBaseUri}/featuretoggle/token-refreshing-hack`);
}

export default function useTokenRefresher(fnr: String) {
    const [shouldRefresh, setShouldRefresh] = useState(true);
    const refresher = useCallback(refreshToken, [fnr]);
    const stop = useCallback(() => {
        setShouldRefresh(false);
    }, [setShouldRefresh]);
    useEffect(() => {
        setShouldRefresh(true);
    }, [fnr]);

    useTimeout(stop, 20 * MINUTTER);
    useInterval(refresher, shouldRefresh ? 4 * MINUTTER : null);
}
