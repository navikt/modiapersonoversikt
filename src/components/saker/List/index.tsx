import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { SakItem } from 'src/components/saker/List/SakItem';
import { getSakId, useFilterSaker } from '../utils';
import { SakerFilter } from './Filter';

export const SakerList = () => (
    <ErrorBoundary boundaryName="sakerList">
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
                <SakerFilter />
                <SakList />
            </VStack>
        </Suspense>
    </ErrorBoundary>
);

const SakList = () => {
    const saker = useFilterSaker();
    const navigate = useNavigate({ from: '/new/person/saker' });

    const handleClick = useCallback(
        (id: string) => {
            navigate({ search: { id } });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/saker',
        select: (p) => p.id
    });
    if (saker.length === 0) {
        return (
            <Alert className="mr-2" variant="info">
                Fant ingen saker
            </Alert>
        );
    }

    return (
        <PaginatedList
            selectedKey={selectedKey}
            items={saker}
            keyExtractor={getSakId}
            renderItem={({ item }) => <SakItem sak={item} handleClick={handleClick} />}
        />
    );
};
