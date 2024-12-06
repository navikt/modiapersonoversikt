import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { FaroErrorBoundary } from '@grafana/faro-react';
import { Alert } from '@navikt/ds-react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

/*
 * Error håndtering for enkelt-widgets.
 * BRUK:
 * <ErrorBoundary>
 *     <Component />
 * </ErrorBoundary>
 *
 */
const ErrorBoundary = ({ children, boundaryName }: React.PropsWithChildren<{ boundaryName: string }>) => {
    return window.faro && import.meta.env.PROD ? (
        <FaroErrorBoundary
            fallback={<AlertStripe type={'advarsel'}>Beklager, det skjedde en feil. ({boundaryName})</AlertStripe>}
        >
            {children}
        </FaroErrorBoundary>
    ) : (
        <ReactErrorBoundary fallback={<Alert variant="error">Beklager, det skedde en feil</Alert>}>
            {children}
        </ReactErrorBoundary>
    );
};
export default ErrorBoundary;
