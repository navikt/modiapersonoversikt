import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { VarslerItem } from 'src/components/varsler/List/VarslerItem';
import { trackingEvents } from 'src/utils/analytics';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { VarslerListFilter } from './Filter';
import { useFilterVarsler } from './utils';

export const VarslerList = () => (
    <VStack minHeight="0" gap="2">
        <VarslerListFilter />
        <ErrorBoundary boundaryName="varslerList">
            <Suspense
                fallback={
                    <VStack gap="2" marginInline="0 2">
                        {Array(8)
                            .keys()
                            .map((i) => (
                                <Skeleton key={i} variant="rounded" height={68} width="100%" />
                            ))}
                    </VStack>
                }
            >
                <VarslerListList />
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const VarslerListList = () => {
    const varsler = useFilterVarsler();
    const navigate = useNavigate({ from: '/new/person/varsler' });
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const handleClick = useCallback(
        (id: string) => {
            navigate({
                search: { id },
                state: {
                    umamiEvent: {
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'varsler', tekst: 'vis varsel' }
                    }
                }
            });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/varsler',
        select: (p) => p.id
    });

    if (!varsler.length) {
        return (
            <Alert className="mr-2" variant="info">
                Ingen varsler funnet
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {varsler.length} {varsler.length === 1 ? 'varsel' : 'varsler'}
            </Heading>
            <PaginatedList
                pageSize={antallListeElementer}
                selectedKey={selectedKey}
                items={varsler}
                keyExtractor={(item) => item.eventId}
                renderItem={({ item }) => <VarslerItem varsel={item} handleClick={handleClick} />}
            />
        </>
    );
};
