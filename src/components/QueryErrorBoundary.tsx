import { Alert, BodyShort, Detail, Heading, Loader } from '@navikt/ds-react';
import type { PropsWithChildren, ReactNode } from 'react';
import type { FetchError } from 'src/api/api';

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

export const FetchErrorRenderer = ({
    errorText,
    error,
    title = 'Feil ved henting av data:'
}: {
    errorText?: string;
    error: FetchError;
    title?: string;
}) => {
    const errText = errorText ?? getErrorText(error);
    return (
        <Alert variant="error">
            <Heading size="xsmall">{title}</Heading>
            <BodyShort size="small">{errText}</BodyShort>
            {error.traceId && <Detail>ID: {error.traceId}</Detail>}
        </Alert>
    );
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
        return <FetchErrorRenderer error={error} errorText={errorText} />;
    }

    return children;
};
export default QueryErrorBoundary;
