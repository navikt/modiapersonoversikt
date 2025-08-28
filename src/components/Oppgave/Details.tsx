import { Alert, GuidePanel, HStack, Skeleton, VStack } from '@navikt/ds-react';
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

    if (!id) {
        return (
            <HStack align="center" justify="center" className="min-h-60">
                <GuidePanel>Velg en oppgave fra menyen på venstre side for å se detaljer.</GuidePanel>
            </HStack>
        );
    }

    if (!oppgave) {
        return (
            <VStack flexGrow="1" minHeight="0" className="mt-6">
                <Alert variant="error">Oppgaven du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
    }

    return (
        <VStack gap="4">
            <OppgaveContent oppgave={oppgave} />
            {oppgave.traadId ? (
                <TraadDetail traadId={oppgave.traadId} valgtOppgaveId={oppgave.oppgaveId} />
            ) : (
                <GuidePanel>Det er ingen dialog knyttet til oppgaven.</GuidePanel>
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
