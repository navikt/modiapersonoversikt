import { Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { VarslerItem } from 'src/components/varsler/List/VarslerItem';
import { VarslerListFilter } from './Filter';
import { useFilterVarsler } from './utils';

export const VarslerList = () => (
    <VStack minHeight="0" gap="2">
        <VarslerListFilter />
        <ErrorBoundary boundaryName="varslerList">
            <Suspense
                fallback={
                    <VStack gap="2" marginInline="0 2">
                        {Array(8)
                            .keys()
                            .map((i) => (
                                <Skeleton key={i} variant="rounded" height={68} width="100%" />
                            ))}
                    </VStack>
                }
            >
                <VarslerListList />
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const VarslerListList = () => {
    const varsler = useFilterVarsler();
    const navigate = useNavigate({ from: '/new/person/varsler' });

    const handleClick = useCallback(
        (id: string) => {
            navigate({ search: { id } });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/varsler',
        select: (p) => p.id
    });

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {varsler.length} {varsler.length === 1 ? 'varsel' : 'varsler'}
            </Heading>
            {varsler.length > 0 && (
                <PaginatedList
                    selectedKey={selectedKey}
                    items={varsler}
                    keyExtractor={(item) => item.eventId}
                    renderItem={({ item }) => <VarslerItem varsel={item} handleClick={handleClick} />}
                />
            )}
        </>
    );
};
