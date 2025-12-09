import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { Suspense } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { UtbetalingItem } from 'src/components/Utbetaling/List/UtbetalingItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { UtbetalingListFilter } from './Filter';
import { getUtbetalingId, useFilterUtbetalinger } from './utils';

export const UtbetalingerList = () => (
    <VStack height="100%" gap="2">
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
                <UtbetalingList />
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const UtbetalingList = () => {
    const utbetalinger = useFilterUtbetalinger();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

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
                paginationSrHeading={{
                    tag: 'h3',
                    text: 'Utbetalingpaginering'
                }}
                pageSize={antallListeElementer}
                selectedKey={selectedKey}
                items={utbetalinger}
                keyExtractor={getUtbetalingId}
                renderItem={({ item }) => <UtbetalingItem utbetaling={item} />}
            />
        </>
    );
};
