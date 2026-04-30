import { getRouteApi, useSearch } from '@tanstack/react-router';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { PaginatedList } from 'src/components/PaginatedList';
import { useAntallListeElementeBasertPaaSkjermStorrelse } from 'src/utils/customHooks';
import { TraadListFilterCard } from './Filter';
import { TraadItem } from './TraadItem';
import { useFilterMeldinger, useTraader } from './utils';

export const TraadList = () => (
    <ErrorBoundary boundaryName="MeldingerList" errorText="Det oppstod en feil under visning av meldinger">
        <Traader />
    </ErrorBoundary>
);

const routeApi = getRouteApi('/new/person/meldinger');

const Traader = () => {
    const { isLoading } = useTraader();
    const filteredMeldinger = useFilterMeldinger();
    const antallListeElementer = useAntallListeElementeBasertPaaSkjermStorrelse();
    const navigate = routeApi.useNavigate();

    const traadId = useSearch({
        from: '/new/person/meldinger',
        select: (p) => p.traadId
    });

    const selectedItem = filteredMeldinger.find((t) => t.traadId === traadId);

    return (
        <PaginatedList
            filterCard={<TraadListFilterCard />}
            isLoading={isLoading}
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
            onSelectItem={(traad) => navigate({ search: { traadId: traad.traadId } })}
            selectedItem={selectedItem}
        />
    );
};
