import { FaroErrorBoundary } from '@grafana/faro-react';
import { Alert } from '@navikt/ds-react';
import type * as React from 'react';

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
    //boundaryName,
    errorText
}: React.PropsWithChildren<{ boundaryName: string; errorText?: string }>) => {
    return (
        <FaroErrorBoundary fallback={<Alert variant="error">{errorText ?? 'Det skjedde en feil'}</Alert>}>
            {children}
        </FaroErrorBoundary>
    );
};
export default ErrorBoundary;
