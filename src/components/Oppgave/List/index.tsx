import { Alert, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { Suspense } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { OppgaveListFilter } from 'src/components/Oppgave/List/Filter';
import { OppgaveItem } from 'src/components/Oppgave/List/OppgaveItem';
import { PaginatedList } from 'src/components/PaginatedList';
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
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/oppgaver',
        select: (p) => p.id
    });

    if (!oppgaver.length) {
        return (
            <Alert className="mr-2" variant="info" role="alert">
                Ingen oppgaver funnet
            </Alert>
        );
    }

    return (
        <PaginatedList
            paginationSrHeading={{
                tag: 'h3',
                text: 'Oppgavepaginering'
            }}
            pageSize={antallListeElementer}
            selectedKey={selectedKey}
            items={oppgaver}
            keyExtractor={getOppgaveId}
            renderItem={({ item }) => <OppgaveItem oppgave={item} />}
        />
    );
};
