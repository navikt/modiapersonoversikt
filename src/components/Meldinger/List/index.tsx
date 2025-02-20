import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useCallback } from 'react';
import { PaginatedList } from 'src/components/PaginatedList';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { TraadListFilterCard, meldingerFilterAtom } from './Filter';
import { TraadItem } from './TraadItem';
import { useFilterMeldinger } from './utils';

export const TraadList = () => (
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
);

const Traader = () => {
    const { data: traader } = useMeldinger();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredMeldinger = useFilterMeldinger(traader, filters);
    const navigate = useNavigate({ from: '/person/meldinger' });

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

    return (
        <>
            <PaginatedList
                items={filteredMeldinger}
                keyExtractor={(item) => item.traadId}
                renderItem={({ item }) => <TraadItem traad={item} handleClick={handleClick} />}
            />
        </>
    );
};
