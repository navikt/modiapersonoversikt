import { Alert, GuidePanel, HStack, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { TraadDetail } from 'src/components/Meldinger/Detail';
import { oppgaveFilterAtom } from 'src/components/Oppgave/List/Filter';
import { getOppgaveId, useFilterOppgave } from 'src/components/Oppgave/List/utils';
import { OppgaveContent } from 'src/components/Oppgave/OppgaveContent';
import { oppgaveRouteMiddleware } from 'src/routes/new/person/oppgaver';

const routeApi = getRouteApi('/new/person/oppgaver');

const OppgaveOgDialogDetail = () => {
    const { id } = routeApi.useSearch();
    const oppgaver = useFilterOppgave();
    const valgtOppgave = oppgaver.find((item) => getOppgaveId(item) === id);
    const filterAtomValue = useAtomValue(oppgaveFilterAtom);
    const prevFilterRef = useRef(filterAtomValue);

    // Fjern oppgave i URL og cache hvis filteret er endret og oppgaven ikke finnes i filtrerte oppgaver
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current) !== JSON.stringify(filterAtomValue);
        const oppgaveIkkeIListe = !valgtOppgave || !oppgaver.includes(valgtOppgave);
        if ((filterEndret && oppgaveIkkeIListe) || oppgaveIkkeIListe) {
            oppgaveRouteMiddleware.clear();
        }
    }, [valgtOppgave, oppgaver, filterAtomValue]);

    if (!oppgaver.length) {
        return (
            <Alert className="mt-2" variant="info">
                Fant ingen oppgaver
            </Alert>
        );
    }

    if (!id) {
        return (
            <HStack margin="4">
                <GuidePanel>Velg en oppgave fra listen på venstre side for å se detaljer.</GuidePanel>
            </HStack>
        );
    }

    if (!valgtOppgave) {
        return (
            <HStack flexGrow="1" minHeight="0" className="">
                <Alert variant="error">Oppgaven du valgte, ble ikke funnet.</Alert>
            </HStack>
        );
    }

    return (
        <VStack gap="4">
            <OppgaveContent oppgave={valgtOppgave} />
            {valgtOppgave.traadId ? (
                <TraadDetail traadId={valgtOppgave.traadId} valgtOppgaveId={valgtOppgave.oppgaveId} />
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
