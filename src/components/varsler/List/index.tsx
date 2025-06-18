import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { VarslerItem } from 'src/components/varsler/List/VarslerItem';
import { VarslerListFilter } from './Filter';
import { useFilterVarsler } from './utils';

export const VarslerList = () => (
    <ErrorBoundary boundaryName="varslerList">
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
            <VStack minHeight="0" gap="2" maxWidth="30rem">
                <VarslerListFilter />
                <VarslerListList />
            </VStack>
        </Suspense>
    </ErrorBoundary>
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

    if (varsler.length === 0) {
        return (
            <Alert className="mr-2" variant="info">
                Fant ingen varsler
            </Alert>
        );
    }

    return (
        <>
            <PaginatedList
                selectedKey={selectedKey}
                items={varsler}
                keyExtractor={(item) => item.eventId}
                renderItem={({ item }) => <VarslerItem varsel={item} handleClick={handleClick} />}
            />
        </>
    );
};
