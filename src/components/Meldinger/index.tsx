import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Alert, Button, GuidePanel, HGrid, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, memo, useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { meldingerFilterAtom } from 'src/components/Meldinger/List/Filter';
import { useFilterMeldinger } from 'src/components/Meldinger/List/utils';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { meldingerRouteMiddleware } from 'src/routes/new/person/meldinger';
import usePrinter from '../Print/usePrinter';
import { TraadDetail } from './Detail';
import { TraadList } from './List';
import MeldingerPrint from './MeldingerPrint';

const PrintThreads = () => {
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;
    const { data: traader } = useMeldinger();

    return (
        <HStack justify="end">
            <Button variant="tertiary" size="xsmall" icon={<PrinterSmallIcon />} onClick={() => printer.triggerPrint()}>
                Skriv ut alle
            </Button>
            <PrinterWrapper>
                {traader.map((traad) => (
                    <MeldingerPrint key={traad.traadId} traad={traad} />
                ))}
            </PrinterWrapper>
        </HStack>
    );
};
const PrintThreadsMemo = memo(PrintThreads);

export const MeldingerPage = () => {
    return (
        <HGrid gap="1" columns={{ xs: 1, md: 'max-content 1fr' }} overflow={{ xs: 'scroll', md: 'hidden' }}>
            <VStack height="100%" maxWidth={{ md: '16em' }} overflow={{ md: 'hidden' }}>
                <ErrorBoundary boundaryName="traadlist">
                    <Suspense
                        fallback={
                            <VStack gap="2" marginInline="0 2">
                                {Array(8)
                                    .keys()
                                    .map((i) => (
                                        <Skeleton key={i} variant="rounded" height={68} />
                                    ))}
                            </VStack>
                        }
                    >
                        <Heading size="small">Dialoger</Heading>

                        <PrintThreadsMemo />
                    </Suspense>
                </ErrorBoundary>
                <TraadList />
            </VStack>
            <VStack flexGrow="1" overflowX="hidden" className="min-h-100 md:min-h-0">
                <VStack overflowY={{ md: 'scroll' }}>
                    <TraadDetailSection />
                </VStack>
            </VStack>
        </HGrid>
    );
};

const routeApi = getRouteApi('/new/person/meldinger');

const TraadDetailSection = () => {
    const { data: traader } = useMeldinger();
    if (traader.length === 0) return;
    const { traadId } = routeApi.useSearch();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredMeldinger = useFilterMeldinger(traader, filters);
    const valgtTraad = filteredMeldinger.find((t) => t.traadId === traadId);

    const prevFilterRef = useRef(meldingerFilterAtom);

    // Fjern traadid i URL og cache kun hvis filteret er endret og tråden ikke finnes i filtrerte tråder
    useEffect(() => {
        const filterEndret = JSON.stringify(prevFilterRef.current.init) !== JSON.stringify(filters);
        const traadIkkeIListe = !valgtTraad || !filteredMeldinger.includes(valgtTraad);
        if (filterEndret && traadIkkeIListe) {
            meldingerRouteMiddleware.clear();
        }
    }, [valgtTraad, filteredMeldinger, filters]);

    if (filteredMeldinger.length === 0) {
        return (
            <Alert variant="info" className="mt-6">
                Fant ingen dialoger
            </Alert>
        );
    }

    if (!traadId) {
        return (
            <HStack margin="4">
                <GuidePanel>Velg en tråd fra listen på venstre side for å se detaljer.</GuidePanel>
            </HStack>
        );
    }

    if (!valgtTraad) {
        return (
            <VStack className="mt-6">
                <Alert variant="error">Tråden du valgte, ble ikke funnet.</Alert>
            </VStack>
        );
    }

    return <TraadDetail traadId={traadId} />;
};
