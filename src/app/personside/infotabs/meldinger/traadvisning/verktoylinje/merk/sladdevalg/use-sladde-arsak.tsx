import { apiBaseUri } from '../../../../../../../../api/config';
import { useRest } from '../../../../../../../../rest/useRest';
import { CenteredLazySpinner } from '../../../../../../../../components/LazySpinner';
import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { ReactElement } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../../../../../../../api/api';

function queryKey(kjedeId: string) {
    return ['sladdeårsak', kjedeId];
}

export function useSladdeArsak(kjedeId: string, handler: (data: string[]) => ReactElement) {
    const url = `${apiBaseUri}/dialogmerking/sladdearsaker/${kjedeId}`;
    const response: UseQueryResult<string[], FetchError> = useQuery({
        queryKey: queryKey(kjedeId),
        queryFn: () => get(url)
    });
    return useRest(response, {
        ifPending: <CenteredLazySpinner />,
        ifError: <AlertStripe type="advarsel">Kunne ikke laste inn årsaker</AlertStripe>,
        ifData: handler
    });
}
