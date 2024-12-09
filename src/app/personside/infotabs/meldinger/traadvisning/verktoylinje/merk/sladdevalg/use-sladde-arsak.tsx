import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import AlertStripe from 'nav-frontend-alertstriper';
import type { ReactElement } from 'react';
import { type FetchError, get } from '../../../../../../../../api/api';
import { apiBaseUri } from '../../../../../../../../api/config';
import { CenteredLazySpinner } from '../../../../../../../../components/LazySpinner';
import { useRest } from '../../../../../../../../rest/useRest';

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
