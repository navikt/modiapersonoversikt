import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { UtbetalingItem } from 'src/components/Utbetaling/List/UtbetalingItem';
import { trackingEvents } from 'src/utils/analytics';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { UtbetalingListFilter } from './Filter';
import { getUtbetalingId, useFilterUtbetalinger } from './utils';

export const UtbetalingerList = () => (
    <VStack minHeight="0" gap="2">
        <UtbetalingListFilter />
        <ErrorBoundary boundaryName="UtbetalingerList">
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
                <VStack minHeight="0" gap="2">
                    <UtbetalingList />
                </VStack>
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const UtbetalingList = () => {
    const utbetalinger = useFilterUtbetalinger();
    const navigate = useNavigate({ from: '/new/person/utbetaling' });
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();
    const handleClick = useCallback(
        (id: string) => {
            navigate({
                search: { id },
                state: {
                    umamiEvent: {
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'utbetaling', tekst: 'åpne utbetaling' }
                    }
                }
            });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/utbetaling',
        select: (p) => p.id
    });

    if (utbetalinger.length === 0) {
        return (
            <Alert className="mr-2" variant="info">
                Ingen utbetalinger funnet
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {utbetalinger.length} {utbetalinger.length === 1 ? 'utbetaling' : 'utbetalinger'}
            </Heading>
            <PaginatedList
                pageSize={antallListeElementer}
                selectedKey={selectedKey}
                items={utbetalinger}
                keyExtractor={getUtbetalingId}
                renderItem={({ item }) => <UtbetalingItem utbetaling={item} handleClick={handleClick} />}
            />
        </>
    );
};
