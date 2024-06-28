import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { FaroErrorBoundary } from '@grafana/faro-react';

/*
 * Error håndtering for enkelt-widgets.
 * BRUK:
 * <ErrorBoundary>
 *     <Component />
 * </ErrorBoundary>
 *
 */
const ErrorBoundary = ({ children, boundaryName }: React.PropsWithChildren<{ boundaryName: string }>) => {
    return (
        <FaroErrorBoundary
            fallback={<AlertStripe type={'advarsel'}>Beklager, det skjedde en feil. ({boundaryName})</AlertStripe>}
        >
            {children}
        </FaroErrorBoundary>
    );
};
export default ErrorBoundary;
