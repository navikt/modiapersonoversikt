import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { VarslerItem } from 'src/components/varsler/List/VarslerItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { VarslerListFilter } from './Filter';
import { useFilterVarsler } from './utils';

export const VarslerList = () => (
    <ErrorBoundary boundaryName="VarslerList" errorText="Det oppstod en feil under visning av varsler liste">
        <VStack height="100%" gap="2">
            <VarslerListFilter />
            <VarslerListList />
        </VStack>
    </ErrorBoundary>
);

const VarslerListList = () => {
    const { varsler, isLoading, isError } = useFilterVarsler();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/varsler',
        select: (p) => p.id
    });

    if (isError) return;

    if (!isLoading && !varsler.length) {
        return (
            <Alert className="mr-2" variant="info" role="alert">
                Ingen varsler funnet
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
                        text: 'Varslerpaginering'
                    }}
                    pageSize={antallListeElementer}
                    selectedKey={selectedKey}
                    items={varsler}
                    keyExtractor={(item) => item.eventId}
                    renderItem={({ item }) => <VarslerItem varsel={item} />}
                />
            )}
        </>
    );
};
