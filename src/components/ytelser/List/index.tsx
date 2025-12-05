import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { type YtelseVedtak, getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { trackingEvents } from 'src/utils/analytics';
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
    const navigate = useNavigate({ from: '/new/person/ytelser' });
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const handleClick = useCallback(
        (id: string, ytelse: YtelseVedtak) => {
            navigate({
                search: { id },
                state: {
                    umamiEvent: {
                        name: trackingEvents.detaljvisningKlikket,
                        data: { fane: 'ytelser', tekst: ytelse.ytelseType.toLowerCase() }
                    }
                }
            });
        },
        [navigate]
    );

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    if (ytelser.length === 0) {
        return (
            <Alert className="mr-2" variant="info">
                Ingen ytelser funner
            </Alert>
        );
    }

    return (
        <>
            <Heading className="pl-1" size="xsmall" level="2">
                {ytelser.length} {ytelser.length === 1 ? 'ytelse' : 'ytelser'}
            </Heading>
            {placeholders.map((placeholder) => (
                <Alert className="mr-2" variant="info" key={placeholder} size="small">
                    {placeholder}
                </Alert>
            ))}
            <PaginatedList
                pageSize={antallListeElementer}
                selectedKey={selectedKey}
                items={ytelser}
                keyExtractor={getUnikYtelseKey}
                renderItem={({ item }) => <YtelseItem ytelse={item} handleClick={handleClick} />}
            />
        </>
    );
};
