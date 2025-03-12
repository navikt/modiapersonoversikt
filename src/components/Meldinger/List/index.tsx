import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useCallback, useMemo } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { datoSynkende } from 'src/utils/date-utils';
import { TraadListFilterCard, meldingerFilterAtom } from './Filter';
import { TraadItem } from './TraadItem';
import { nyesteMelding, useFilterMeldinger } from './utils';

export const TraadList = () => (
    <ErrorBoundary boundaryName="traadlist">
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
                <TraadListFilterCard />
                <Traader />
            </VStack>
        </Suspense>
    </ErrorBoundary>
);

const Traader = () => {
    const { data: traader } = useMeldinger();
    const filters = useAtomValue(meldingerFilterAtom);
    const sortedTraader = useMemo(
        () => traader.toSorted(datoSynkende((t) => nyesteMelding(t).opprettetDato)),
        [traader]
    );
    const filteredMeldinger = useFilterMeldinger(sortedTraader, filters);
    const navigate = useNavigate({ from: '/new/person/meldinger' });

    const handleClick = useCallback(
        (traadId: string) => {
            navigate({ search: { traadId } });
        },
        [navigate]
    );

    if (traader.length === 0) {
        return <Alert variant="info">Brukeren har ingen dialoger</Alert>;
    }

    if (filteredMeldinger.length === 0) {
        return <Alert variant="info">Fant ingen dialoger</Alert>;
    }

    const traadId = useSearch({
        from: '/new/person/meldinger',
        select: (p) => p.traadId
    });

    return (
        <>
            <PaginatedList
                paginationSrHeading={{
                    tag: 'h3',
                    text: 'Trådlistepaginering'
                }}
                aria-label="Tråder"
                as="section"
                selectedKey={traadId}
                items={filteredMeldinger}
                keyExtractor={(item) => item.traadId}
                renderItem={({ item }) => <TraadItem traad={item} handleClick={handleClick} />}
            />
        </>
    );
};
