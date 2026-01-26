import { BodyShort, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { useTraader } from 'src/components/Meldinger/List/utils';
import { PaginatedList } from 'src/components/PaginatedList';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { meldingerFilterAtom, TraadListFilterCard } from './Filter';
import { TraadItem } from './TraadItem';
import { useFilterMeldinger } from './utils';

export const TraadList = () => {
    const { data: traader, isLoading } = useTraader();
    const filters = useAtomValue(meldingerFilterAtom);
    const filteredMeldinger = useFilterMeldinger(traader, filters);
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const traadId = useSearch({
        from: '/new/person/meldinger',
        select: (p) => p.traadId
    });

    return (
        <VStack height="100%" gap="2">
            <TraadListFilterCard />
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
                        {filteredMeldinger.length} {filteredMeldinger.length === 1 ? 'dialog' : 'dialoger'}
                        <BodyShort visuallyHidden>funnet</BodyShort>
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
                        renderItem={({ item }) => <TraadItem traad={item} />}
                    />
                </>
            )}
        </VStack>
    );
};
