import { BodyShort, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { PaginatedList } from 'src/components/PaginatedList';
import { UtbetalingItem } from 'src/components/Utbetaling/List/UtbetalingItem';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { UtbetalingListFilter } from './Filter';
import { getUtbetalingId, useFilterUtbetalinger } from './utils';

export const UtbetalingList = () => {
    const { data, isLoading } = useFilterUtbetalinger();
    const utbetalinger = data?.utbetalinger ?? [];

    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/utbetaling',
        select: (p) => p.id
    });

    return (
        <VStack height="100%" gap="2">
            <UtbetalingListFilter />
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
                        {utbetalinger.length} {utbetalinger.length === 1 ? 'utbetaling' : 'utbetalinger'}
                        <BodyShort visuallyHidden>funnet</BodyShort>
                    </Heading>
                    <PaginatedList
                        paginationSrHeading={{
                            tag: 'h3',
                            text: 'Utbetalingpaginering'
                        }}
                        pageSize={antallListeElementer}
                        selectedKey={selectedKey}
                        items={utbetalinger}
                        keyExtractor={getUtbetalingId}
                        renderItem={({ item }) => <UtbetalingItem utbetaling={item} />}
                    />
                </>
            )}
        </VStack>
    );
};
