import { Alert, BodyShort, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { YtelserListFilter } from './Filter';

export const YtelserList = () => {
    const { pending } = useFilterYtelser();

    return (
        <VStack height="100%" gap="2">
            <YtelserListFilter />
            <ErrorBoundary boundaryName="YtelserList">
                {pending ? (
                    <VStack gap="2" marginInline="0 2">
                        {Array(8)
                            .keys()
                            .map((i) => (
                                <Skeleton key={i} variant="rounded" height={68} />
                            ))}
                    </VStack>
                ) : (
                    <YtelseList />
                )}
            </ErrorBoundary>
        </VStack>
    );
};

const YtelseList = () => {
    const { ytelser, placeholders } = useFilterYtelser();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    if (ytelser.length === 0) {
        return (
            <Alert className="mr-2" variant="info" role="alert">
                Ingen ytelser funner
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="3" aria-live="polite">
                {ytelser.length} {ytelser.length === 1 ? 'ytelse' : 'ytelser'}
                <BodyShort visuallyHidden>funnet</BodyShort>
            </Heading>
            {placeholders.map((placeholder) => (
                <Alert className="mr-2" variant="info" key={placeholder} size="small">
                    {placeholder}
                </Alert>
            ))}
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
    );
};
