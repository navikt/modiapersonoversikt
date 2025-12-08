import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { OppgaveListFilter } from 'src/components/Oppgave/List/Filter';
import { OppgaveItem } from 'src/components/Oppgave/List/OppgaveItem';
import { PaginatedList } from 'src/components/PaginatedList';
import { trackingEvents } from 'src/utils/analytics';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { getOppgaveId, useFilterOppgave } from './utils';

export const OppgaverList = () => (
    <VStack height="100%" gap="2">
        <OppgaveListFilter />
        <ErrorBoundary boundaryName="oppgaverList">
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
                <OppgaveList />
            </Suspense>
        </ErrorBoundary>
    </VStack>
);

const OppgaveList = () => {
    const oppgaver = useFilterOppgave();
    const navigate = useNavigate({ from: '/new/person/oppgaver' });
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const handleClick = useCallback(
        (id: string) => {
            navigate({
                search: { id },
                state: {
                    umamiEvent: {
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'oppgaver', tekst: 'vis oppgave' }
                    }
                }
            });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/oppgaver',
        select: (p) => p.id
    });

    if (!oppgaver.length) {
        return (
            <Alert className="mr-2" variant="info">
                Ingen oppgaver funnet
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {oppgaver.length} {oppgaver.length === 1 ? 'oppgave' : 'oppgaver'}
            </Heading>
            <PaginatedList
                paginationSrHeading={{
                    tag: 'h3',
                    text: 'Oppgavepaginering'
                }}
                pageSize={antallListeElementer}
                selectedKey={selectedKey}
                items={oppgaver}
                keyExtractor={getOppgaveId}
                renderItem={({ item }) => <OppgaveItem oppgave={item} handleClick={handleClick} />}
            />
        </>
    );
};
