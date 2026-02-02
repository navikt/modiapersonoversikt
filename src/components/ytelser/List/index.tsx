import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { YtelserListFilter } from './Filter';

export const YtelserList = () => (
    <ErrorBoundary boundaryName="YtelserList" errorText="Det oppstod en feil under visning av ytelser liste">
        <VStack height="100%" gap="2">
            <YtelserListFilter />
            <YtelseList />
        </VStack>
    </ErrorBoundary>
);

const YtelseList = () => {
    const { data: ytelser, isLoading, isError } = useFilterYtelser();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    if (isError) return;

    if (!isLoading && ytelser.length === 0) {
        return (
            <Alert className="mr-2" variant="info" role="alert">
                Ingen ytelser funner
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
                            <Skeleton key={i} variant="rounded" height={68} />
                        ))}
                </VStack>
            ) : (
                <PaginatedList
                    paginationSrHeading={{
                        tag: 'h3',
                        text: 'Ytelsepaginering'
                    }}
                    pageSize={antallListeElementer}
                    selectedKey={selectedKey}
                    items={ytelser}
                    keyExtractor={getUnikYtelseKey}
                    renderItem={({ item }) => <YtelseItem ytelse={item} />}
                />
            )}
        </>
    );
};
