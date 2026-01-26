import { Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { PaginatedList } from 'src/components/PaginatedList';
import { SakItem } from 'src/components/saker/List/SakItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { getSakId, useFilterSaker } from '../utils';
import { SakerFilter } from './Filter';

export const SakerList = () => {
    const { data, isLoading } = useFilterSaker();
    const saker = data?.saker ?? [];
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/saker',
        select: (p) => p.id
    });

    return (
        <VStack height="100%" gap="2">
            <SakerFilter />
            {isLoading ? (
                <VStack gap="2" marginInline="0 2">
                    {Array(8)
                        .keys()
                        .map((i) => (
                            <Skeleton key={i} variant="rounded" height={68} />
                        ))}
                </VStack>
            ) : (
                <PaginatedList
                    paginationSrHeading={{
                        tag: 'h3',
                        text: 'Sakerpaginerg'
                    }}
                    pageSize={antallListeElementer}
                    selectedKey={selectedKey}
                    items={saker}
                    keyExtractor={getSakId}
                    renderItem={({ item }) => <SakItem sak={item} />}
                />
            )}
        </VStack>
    );
};
