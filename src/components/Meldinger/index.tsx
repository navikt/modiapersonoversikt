import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button, HGrid, HStack, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { Suspense, memo } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
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
                <HStack justify="space-between">
                    <Heading level="2" size="xsmall">
                        Innboks
                    </Heading>
                </HStack>
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
                        <PrintThreadsMemo />
                    </Suspense>
                </ErrorBoundary>
                <TraadList />
            </VStack>
            <VStack flexGrow="1" minHeight={{ xs: '100', md: '0' }} overflowX="hidden">
                <Heading level="2" size="xsmall">
                    Dialog
                </Heading>
                <VStack overflowY={{ md: 'scroll' }}>
                    <TraadDetailSection />
                </VStack>
            </VStack>
        </HGrid>
    );
};

const routeApi = getRouteApi('/new/person/meldinger');

const TraadDetailSection = () => {
    const { traadId } = routeApi.useSearch();

    return traadId ? <TraadDetail traadId={traadId} /> : <span>Ingen melding valgt</span>;
};
