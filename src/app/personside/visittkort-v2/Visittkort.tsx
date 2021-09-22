import * as React from 'react';
import useFetch, { isPending, hasError } from '@nutgaard/use-fetch';
import { Data as Persondata } from './PersondataDomain';
import { BigCenteredLazySpinner } from '../../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../components/ErrorBoundary';
import VisittkortVisning from './VisittkortVisning';
import { useFodselsnummer } from '../../../utils/customHooks';
import { apiBaseUri } from '../../../api/config';

function Visittkort() {
    const fnr = useFodselsnummer();
    const persondataResponse = useFetch<Persondata>(`${apiBaseUri}/v2/person/${fnr}`);
    if (isPending(persondataResponse)) {
        return BigCenteredLazySpinner;
    } else if (hasError(persondataResponse)) {
        return (
            <FillCenterAndFadeIn>
                <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
            </FillCenterAndFadeIn>
        );
    }
    return (
        <ErrorBoundary>
            <VisittkortVisning persondata={persondataResponse.data} />
        </ErrorBoundary>
    );
}

export default Visittkort;
