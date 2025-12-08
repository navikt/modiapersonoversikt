import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { SakItem } from 'src/components/saker/List/SakItem';
import { trackingEvents } from 'src/utils/analytics';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { getSakId, useFilterSaker } from '../utils';
import { SakerFilter } from './Filter';

export const SakerList = () => (
    <ErrorBoundary boundaryName="sakerList">
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
            <VStack height="100%" gap="2">
                <SakerFilter />
                <SakList />
            </VStack>
        </Suspense>
    </ErrorBoundary>
);

const SakList = () => {
    const saker = useFilterSaker();
    const navigate = useNavigate({ from: '/new/person/saker' });
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const handleClick = useCallback(
        (id: string) => {
            navigate({
                search: { id },
                state: {
                    umamiEvent: {
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'saker', tekst: 'åpne sak' }
                    }
                }
            });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/saker',
        select: (p) => p.id
    });
    if (saker.length === 0) {
        return (
            <Alert className="mr-2" variant="info">
                Ingen saker funnet
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {saker.length} {saker.length === 1 ? 'sak' : 'saker'} funnet
            </Heading>
            <PaginatedList
                paginationSrHeading={{
                    tag: 'h3',
                    text: 'Sakerpaginerg'
                }}
                pageSize={antallListeElementer}
                selectedKey={selectedKey}
                items={saker}
                keyExtractor={getSakId}
                renderItem={({ item }) => <SakItem sak={item} handleClick={handleClick} />}
            />
        </>
    );
};
