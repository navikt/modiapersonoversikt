import { FaroErrorBoundary } from '@grafana/faro-react';
import { Alert } from '@navikt/ds-react';
import AlertStripe from 'nav-frontend-alertstriper';
import type * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { FetchError } from 'src/api/api';
import { FetchErrorRenderer } from './QueryErrorBoundary';

/*
 * Error håndtering for enkelt-widgets.
 * BRUK:
 * <ErrorBoundary>
 *     <Component />
 * </ErrorBoundary>
 *
 */
const ErrorBoundary = ({
    children,
    boundaryName,
    errorText
}: React.PropsWithChildren<{ boundaryName: string; errorText?: string }>) => {
    return window.faro && import.meta.env.PROD ? (
        <FaroErrorBoundary
            fallback={<AlertStripe type={'advarsel'}>Beklager, det skjedde en feil. ({boundaryName})</AlertStripe>}
        >
            {children}
        </FaroErrorBoundary>
    ) : (
        <ReactErrorBoundary
            fallbackRender={({ error }) => {
                if (error instanceof FetchError) return <FetchErrorRenderer error={error} errorText={errorText} />;

                return <Alert variant="error">{errorText ?? 'Beklager, det skedde en feil'}</Alert>;
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
};
export default ErrorBoundary;
