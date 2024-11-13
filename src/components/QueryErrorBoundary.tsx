import React, { ReactNode } from 'react';
import { Alert, Detail, Loader } from '@navikt/ds-react';
import { PropsWithChildren } from 'react';
import { FetchError } from 'src/api/api';

type Props = {
    loading?: boolean;
    loader?: ReactNode;
    error?: FetchError | null;
    errorText?: string;
};

/*
 * Error & loading håndtering for data-henting.
 * BRUK:
 * <QueryErrorBoundary error={error} loading={isLoading}>
 *     <Component />
 * </QueryErrorBoundary>
 *
 */
const QueryErrorBoundary = ({ children, error, loading, loader, errorText }: PropsWithChildren<Props>) => {
    if (loading) {
        return loader ?? <Loader />;
    }

    if (error) {
        const errText = errorText ?? `Feil ved henting av data: ${error.message}`;
        return (
            <Alert variant="error">
                {errText}
                {error.traceId && <Detail>ID: {error.traceId}</Detail>}
            </Alert>
        );
    }

    return children;
};
export default QueryErrorBoundary;
