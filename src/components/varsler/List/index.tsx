import { BodyShort, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { PaginatedList } from 'src/components/PaginatedList';
import { VarslerItem } from 'src/components/varsler/List/VarslerItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { VarslerListFilter } from './Filter';
import { useFilterVarsler } from './utils';

export const VarslerList = () => {
    const { varsler, isLoading } = useFilterVarsler();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();
    const selectedKey = useSearch({
        from: '/new/person/varsler',
        select: (p) => p.id
    });

    return (
        <VStack height="100%" gap="2">
            <VarslerListFilter />
            {isLoading ? (
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
                        {varsler.length} {varsler.length === 1 ? 'varsel' : 'varsler'}
                        <BodyShort visuallyHidden>funnet</BodyShort>
                    </Heading>
                    <PaginatedList
                        paginationSrHeading={{
                            tag: 'h3',
                            text: 'Varslerpaginering'
                        }}
                        pageSize={antallListeElementer}
                        selectedKey={selectedKey}
                        items={varsler}
                        keyExtractor={(item) => item.eventId}
                        renderItem={({ item }) => <VarslerItem varsel={item} />}
                    />
                </>
            )}
        </VStack>
    );
};
