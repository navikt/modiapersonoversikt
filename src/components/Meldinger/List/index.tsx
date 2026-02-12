import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { meldingerFilterAtom, TraadListFilterCard } from './Filter';
import { TraadItem } from './TraadItem';
import { useFilterMeldinger, useTraader } from './utils';

export const TraadList = () => (
    <ErrorBoundary boundaryName="MeldingerList" errorText="Det oppstod en feil under visning av melding liste">
        <VStack height="100%" gap="1">
            <TraadListFilterCard />
            <Traader />
        </VStack>
    </ErrorBoundary>
);

const Traader = () => {
    const { data: traader, isLoading, isError } = useTraader();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredMeldinger = useFilterMeldinger(traader, filters);
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const traadId = useSearch({
        from: '/new/person/meldinger',
        select: (p) => p.traadId
    });

    if (isError) return;

    if (!isLoading && filteredMeldinger.length === 0) {
        return (
            <Alert variant="info" role="alert">
                ingen dialoger funnet
            </Alert>
        );
    }

    return (
        <>
            {isLoading ? (
                <VStack gap="2">
                    {Array(8)
                        .keys()
                        .map((i) => (
                            <Skeleton key={i} variant="rectangle" height={68} />
                        ))}
                </VStack>
            ) : (
                <PaginatedList
                    pageSize={antallListeElementer}
                    paginationSrHeading={{
                        tag: 'h3',
                        text: 'Trådlistepaginering'
                    }}
                    aria-label="Tråder"
                    as="section"
                    selectedKey={traadId}
                    items={filteredMeldinger}
                    keyExtractor={(item) => item.traadId}
                    renderItem={({ item }) => <TraadItem traad={item} />}
                />
            )}
        </>
    );
};
