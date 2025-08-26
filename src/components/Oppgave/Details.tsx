import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TraadDetail } from 'src/components/Meldinger/Detail';
import { getOppgaveId, useFilterOppgave } from 'src/components/Oppgave/List/utils';
import { OppgaveContent } from 'src/components/Oppgave/OppgaveContent';

const routeApi = getRouteApi('/new/person/oppgaver');

const OppgaveOgDialogDetail = () => {
    const { id } = routeApi.useSearch();
    const oppgaver = useFilterOppgave();
    const oppgave = oppgaver.find((item) => getOppgaveId(item) === id);

    if (!oppgave) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="info">Ingen valgte oppgave.</Alert>
            </VStack>
        );
    }

    return (
        <VStack gap="4">
            <OppgaveContent oppgave={oppgave} />
            {oppgave.traadId ? (
                <TraadDetail traadId={oppgave.traadId} valgtOppgaveId={oppgave.oppgaveId} />
            ) : (
                <Alert variant="info">Ingen dialog funnet.</Alert>
            )}
        </VStack>
    );
};

export const OppgaveDetail = () => {
    return (
        <ErrorBoundary boundaryName="oppgaveDetaljer">
            <Suspense fallback={<Skeleton variant="rounded" height="200" />}>
                <OppgaveOgDialogDetail />
            </Suspense>
        </ErrorBoundary>
    );
};
