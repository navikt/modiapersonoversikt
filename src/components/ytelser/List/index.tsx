import { Alert, BodyShort, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { YtelserListFilter } from './Filter';

export const YtelserList = () => {
    const { data: ytelser, isLoading } = useFilterYtelser();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    if (!isLoading && ytelser.length === 0) {
        return (
            <Alert className="mr-2" variant="info" role="alert">
                Ingen ytelser funner
            </Alert>
        );
    }

    return (
        <VStack height="100%" gap="2">
            <YtelserListFilter />
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
                        {ytelser.length} {ytelser.length === 1 ? 'ytelse' : 'ytelser'}
                        <BodyShort visuallyHidden>funnet</BodyShort>
                    </Heading>
                    <PaginatedList
                        paginationSrHeading={{
                            tag: 'h3',
                            text: 'Ytelsepaginering'
                        }}
                        pageSize={antallListeElementer}
                        selectedKey={selectedKey}
                        items={ytelser}
                        keyExtractor={getUnikYtelseKey}
                        renderItem={({ item }) => <YtelseItem ytelse={item} />}
                    />
                </>
            )}
        </VStack>
    );
};
