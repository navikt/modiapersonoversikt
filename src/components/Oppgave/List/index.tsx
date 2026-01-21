import { Alert, BodyShort, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { OppgaveListFilter } from 'src/components/Oppgave/List/Filter';
import { OppgaveItem } from 'src/components/Oppgave/List/OppgaveItem';
import { PaginatedList } from 'src/components/PaginatedList';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { getOppgaveId, useFilterOppgave } from './utils';

export const OppgaverList = () => {
    const { oppgaver, pending } = useFilterOppgave();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/oppgaver',
        select: (p) => p.id
    });

    if (!pending && !oppgaver.length) {
        return (
            <Alert className="mr-2" variant="info" role="alert">
                Ingen oppgaver funnet
            </Alert>
        );
    }

    return (
        <VStack height="100%" gap="2">
            <OppgaveListFilter />
            {pending ? (
                <VStack gap="2" marginInline="0 2">
                    {Array(8)
                        .keys()
                        .map((i) => (
                            <Skeleton key={i} variant="rounded" height={68} />
                        ))}
                </VStack>
            ) : (
                <>
                    <Heading className="pl-1" size="xsmall" level="3" role="alert">
                        {oppgaver.length} {oppgaver.length === 1 ? 'oppgave' : 'oppgaver'}
                        <BodyShort visuallyHidden>funnet</BodyShort>
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
                        renderItem={({ item }) => <OppgaveItem oppgave={item} />}
                    />
                </>
            )}
        </VStack>
    );
};
