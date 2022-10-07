import { apiBaseUri } from '../../../../../../../../api/config';
import { useRest } from '../../../../../../../../rest/useRest';
import { CenteredLazySpinner } from '../../../../../../../../components/LazySpinner';
import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { ReactElement } from 'react';

export function useSladdeArsak(kjedeId: string, handler: (data: string[]) => ReactElement) {
    const url = `${apiBaseUri}/dialogmerking/sladdearsaker/${kjedeId}`;
    return useRest(url, {
        ifPending: <CenteredLazySpinner />,
        ifError: <AlertStripe type="advarsel">Kunne ikke laste inn årsaker</AlertStripe>,
        ifData: handler
    });
}
