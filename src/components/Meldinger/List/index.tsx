import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { trackingEvents } from 'src/utils/analytics';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { TraadListFilterCard, meldingerFilterAtom } from './Filter';
import { TraadItem } from './TraadItem';
import { useFilterMeldinger } from './utils';

export const TraadList = () => (
    <VStack minHeight="0" gap="2">
        <TraadListFilterCard />
        <ErrorBoundary boundaryName="MeldingerList">
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
                <Traader />
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const Traader = () => {
    const { data: traader } = useMeldinger();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredMeldinger = useFilterMeldinger(traader, filters);
    const navigate = useNavigate({ from: '/new/person/meldinger' });
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const handleClick = useCallback(
        (traadId: string) => {
            navigate({
                search: { traadId },
                state: {
                    umamiEvent: {
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'meldinger', tekst: 'åpne melding' }
                    }
                }
            });
        },
        [navigate]
    );

    const traadId = useSearch({
        from: '/new/person/meldinger',
        select: (p) => p.traadId
    });

    if (filteredMeldinger.length === 0) {
        return (
            <Alert variant="info" className="mr-2">
                ingen dialoger funnet
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {filteredMeldinger.length} {filteredMeldinger.length === 1 ? 'dialog' : 'dialoger'}
            </Heading>
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
                renderItem={({ item }) => <TraadItem traad={item} handleClick={handleClick} />}
            />
        </>
    );
};
