import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { UtbetalingItem } from 'src/components/Utbetaling/List/UtbetalingItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { UtbetalingListFilter } from './Filter';
import { getUtbetalingId, useFilterUtbetalinger } from './utils';

export const UtbetalingerList = () => (
    <ErrorBoundary boundaryName="UtbetalingerList" errorText="Det oppstod en feil under visning av utbetalinger liste">
        <VStack height="100%" gap="1">
            <UtbetalingListFilter />
            <UtbetalingList />
        </VStack>
    </ErrorBoundary>
);

const UtbetalingList = () => {
    const { data, isLoading, isError } = useFilterUtbetalinger();
    const utbetalinger = data?.utbetalinger ?? [];
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/utbetaling',
        select: (p) => p.id
    });

    if (isError) return;

    if (!isLoading && utbetalinger.length === 0) {
        return (
            <Alert variant="info" role="alert">
                Ingen utbetalinger funnet
            </Alert>
        );
    }

    return (
        <>
            {isLoading ? (
                <VStack gap="2" marginInline="0 2">
                    {Array(8)
                        .keys()
                        .map((i) => (
                            <Skeleton key={i} variant="rectangle" height={68} />
                        ))}
                </VStack>
            ) : (
                <PaginatedList
                    paginationSrHeading={{
                        tag: 'h3',
                        text: 'Utbetalingpaginering'
                    }}
                    as="section"
                    aria-label="utbetalinger"
                    pageSize={antallListeElementer}
                    selectedKey={selectedKey}
                    items={utbetalinger}
                    keyExtractor={getUtbetalingId}
                    renderItem={({ item }) => <UtbetalingItem utbetaling={item} />}
                />
            )}
        </>
    );
};
