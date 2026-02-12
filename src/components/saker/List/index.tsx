import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { SakItem } from 'src/components/saker/List/SakItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { getSakId, useFilterSaker } from '../utils';
import { SakerFilter } from './Filter';

export const SakerList = () => (
    <ErrorBoundary boundaryName="SakerList" errorText="Det oppstod en feil under visning av saker liste">
        <VStack height="100%" gap="1">
            <SakerFilter />
            <SakList />
        </VStack>
    </ErrorBoundary>
);

const SakList = () => {
    const { data, isLoading, isError } = useFilterSaker();
    const saker = data?.saker ?? [];
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/saker',
        select: (p) => p.id
    });

    if (isError) return;

    if (!isLoading && saker.length === 0) {
        return (
            <Alert variant="info" role="alert">
                Ingen saker funnet
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
                        text: 'Sakerpaginerg'
                    }}
                    aria-label="saker"
                    as="section"
                    pageSize={antallListeElementer}
                    selectedKey={selectedKey}
                    items={saker}
                    keyExtractor={getSakId}
                    renderItem={({ item }) => <SakItem sak={item} />}
                />
            )}
        </>
    );
};
