import * as React from 'react';
import { isPending, hasError } from '@nutgaard/use-fetch';
import { BigCenteredLazySpinner } from '../../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../components/ErrorBoundary';
import VisittkortVisning from './VisittkortVisning';
import { useHentPersondata } from '../../../utils/customHooks';

function Visittkort() {
    const persondataResponse = useHentPersondata();

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
