import { Alert } from '@navikt/ds-react';
import { useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { YtelseItem } from 'src/components/ytelser/List/YtelseItem';
import { getUnikYtelseKey, useFilterYtelser } from 'src/components/ytelser/utils';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { YtelserListFilter } from './Filter';

export const YtelserList = () => (
    <ErrorBoundary boundaryName="YtelserList" errorText="Det oppstod en feil under visning av ytelser liste">
        <YtelseList />
    </ErrorBoundary>
);

const YtelseList = () => {
    const { data: ytelser, isLoading, isError } = useFilterYtelser();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();

    const selectedKey = useSearch({
        from: '/new/person/ytelser',
        select: (p) => p.id
    });

    if (isError) return;

    if (!isLoading && ytelser.length === 0) {
        return (
            <Alert variant="info" role="alert">
                Ingen ytelser funner
            </Alert>
        );
    }

    return (
        <PaginatedList
            paginationSrHeading={{
                tag: 'h3',
                text: 'Ytelsepaginering'
            }}
            filterCard={<YtelserListFilter />}
            as="section"
            aria-label="ytelser"
            pageSize={antallListeElementer}
            selectedKey={selectedKey}
            items={ytelser}
            isLoading={isLoading}
            keyExtractor={getUnikYtelseKey}
            renderItem={({ item }) => <YtelseItem ytelse={item} />}
        />
    );
};
