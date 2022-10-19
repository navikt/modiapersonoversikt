import * as React from 'react';
import { BigCenteredLazySpinner } from '../../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import ErrorBoundary from '../../../components/ErrorBoundary';
import VisittkortVisning from './VisittkortVisning';
import persondataResource from '../../../rest/resources/persondataResource';

function Visittkort() {
    const persondataResponse = persondataResource.useFetch();

    if (persondataResponse.isLoading) {
        return BigCenteredLazySpinner;
    } else if (persondataResponse.isError) {
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
