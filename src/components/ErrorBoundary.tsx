import { Alert } from '@navikt/ds-react';
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
    return (
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
