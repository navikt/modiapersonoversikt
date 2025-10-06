import { Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { YtelserListFilter } from './Filter';

export const YtelserList = () => (
    <VStack minHeight="0" gap="2">
        <YtelserListFilter />
        <ErrorBoundary boundaryName="YtelserList">
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
                <YtelseList />
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const YtelseList = () => {
    const ytelser = useFilterYtelser();
    const navigate = useNavigate({ from: '/new/person/ytelser' });

    const handleClick = useCallback(
        (id: string) => {
            navigate({ search: { id } });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {ytelser.length} {ytelser.length === 1 ? 'ytelse' : 'ytelser'}
            </Heading>
            {ytelser.length > 0 && (
                <PaginatedList
                    selectedKey={selectedKey}
                    items={ytelser}
                    keyExtractor={getUnikYtelseKey}
                    renderItem={({ item }) => <YtelseItem ytelse={item} handleClick={handleClick} />}
                />
            )}
        </>
    );
};
