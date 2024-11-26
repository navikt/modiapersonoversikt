import { ReactNode } from 'react';
import { Alert, BodyShort, Detail, Heading, Loader } from '@navikt/ds-react';
import { PropsWithChildren } from 'react';
import { FetchError } from 'src/api/api';

const getErrorText = (error: FetchError) => {
    if (error.message) return error.message;

    switch (error.response.status) {
        case 400:
            return 'Ugyldig input. Sjekk at innsendt verdi er riktig.';
        case 403:
            return 'Du har ikke tilgang til denne ressursen. Dette kan skyldes manglende tilgangsroller eller at du ikke har tilgang til den spesifikke ressursen.';
        default:
            return `${error.response.status} ${error.response.statusText}`;
    }
};

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
        const errText = errorText ?? getErrorText(error);
        return (
            <Alert variant="error">
                <Heading size="xsmall">Feil ved henting av data:</Heading>
                <BodyShort size="small">{errText}</BodyShort>
                {error.traceId && <Detail>ID: {error.traceId}</Detail>}
            </Alert>
        );
    }

    return children;
};
export default QueryErrorBoundary;
