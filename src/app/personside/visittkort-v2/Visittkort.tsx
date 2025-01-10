import AlertStripe from 'nav-frontend-alertstriper';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { BigCenteredLazySpinner } from '../../../components/BigCenteredLazySpinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import persondataResource from '../../../rest/resources/persondataResource';
import VisittkortVisning from './VisittkortVisning';

function Visittkort() {
    const persondataResponse = persondataResource.useFetch();

    if (persondataResponse.isLoading) {
        return BigCenteredLazySpinner;
    }
    if (persondataResponse.isError) {
        return (
            <FillCenterAndFadeIn>
                <AlertStripe type="advarsel">Beklager. Det skjedde en feil ved lasting av persondata.</AlertStripe>
            </FillCenterAndFadeIn>
        );
    }
    return (
        <ErrorBoundary boundaryName="Visittkort">
            {persondataResponse.data && <VisittkortVisning persondata={persondataResponse.data} />}
        </ErrorBoundary>
    );
}

export default Visittkort;
