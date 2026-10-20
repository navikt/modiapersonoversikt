import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { act, cleanup, render, screen } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import { useSyncExternalStore } from 'react';
import { FetchError } from 'src/api/api';
import { DokumenterFilter, dokumenterFilterAtom } from 'src/components/Dokumenter/Filter';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import featuretoggles, { type FeatureTogglesResponse } from 'src/rest/resources/featuretogglesResource';

const route = vi.hoisted(() => ({
    search: { tema: ['DAG'] },
    navigate: vi.fn()
}));

const dokumentdata = vi.hoisted(() => ({
    loaded: true,
    listeners: new Set<() => void>()
}));

vi.mock('@tanstack/react-router', () => ({
    getRouteApi: () => ({
        useSearch: () => route.search,
        useNavigate: () => route.navigate
    })
}));
vi.mock('src/lib/state/context', async () => {
    const { atom } = await import('jotai');
    return { aktivBrukerLastetAtom: atom(false), usePersonAtomValue: () => undefined };
});
vi.mock('src/components/DateFilters/DateRangePickerWithDebounce', () => ({
    DateRangePickerWithDebounce: () => null
}));
vi.mock('src/components/Dokumenter/utils', () => ({
    avsenderLabel: {},
    useAvsendereForPeriode: () => [],
    useTemaerForPeriode: () => [],
    useTemaDokumentStatistikk: () => ({
        dataLoaded: useSyncExternalStore(
            (listener) => {
                dokumentdata.listeners.add(listener);
                return () => dokumentdata.listeners.delete(listener);
            },
            () => dokumentdata.loaded
        ),
        temaer: [
            {
                temakode: 'DAG',
                temanavn: 'Dagpenger',
                harTilgang: true,
                antallDokumenter: 0,
                nyesteDokumentDato: null
            }
        ]
    })
}));

const toggles = (nyttTemaFilter: boolean): FeatureTogglesResponse => ({
    [FeatureToggles.JournalforUtenSvar]: false,
    [FeatureToggles.VisPromptMeldingSending]: false,
    [FeatureToggles.NyModiaKnapp]: false,
    [FeatureToggles.InfotrygdSykepenger]: false,
    [FeatureToggles.SpokelseSykepenger]: false,
    [FeatureToggles.NyOversiktDesign]: false,
    [FeatureToggles.NyttDokumentTemaFilter]: nyttTemaFilter
});

let queryClient: QueryClient;

beforeEach(() => {
    route.search = { tema: ['DAG'] };
    dokumentdata.loaded = true;
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    vi.spyOn(featuretoggles, 'useFetch').mockImplementation(() =>
        useQuery<FeatureTogglesResponse, FetchError>({
            queryKey: featuretoggles.queryKey,
            queryFn: () => new Promise(() => {})
        })
    );
    route.navigate.mockClear();
});

afterEach(() => {
    cleanup();
    queryClient.clear();
    vi.restoreAllMocks();
});

const renderFilter = () => {
    const store = createStore();
    render(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <DokumenterFilter />
            </Provider>
        </QueryClientProvider>
    );
    return store;
};

it('beholder URL-valgte tema mens togglen lastes og etter at det nye filteret aktiveres', async () => {
    const store = renderFilter();

    expect(screen.queryByRole('combobox', { name: 'Tema' })).not.toBeInTheDocument();
    expect(store.get(dokumenterFilterAtom).temaer).toEqual(['DAG']);
    expect(route.navigate).not.toHaveBeenCalled();

    await act(async () => {
        queryClient.setQueryData(featuretoggles.queryKey, toggles(true));
    });

    expect(await screen.findByRole('checkbox', { name: 'Dagpenger (0)' })).toBeChecked();
    expect(store.get(dokumenterFilterAtom).temaer).toEqual(['DAG']);
    expect(route.navigate).not.toHaveBeenCalled();
});

it('viser det gamle filteret først når togglen er lastet og avslått', async () => {
    renderFilter();
    expect(screen.queryByRole('combobox', { name: 'Tema' })).not.toBeInTheDocument();

    await act(async () => {
        queryClient.setQueryData(featuretoggles.queryKey, toggles(false));
    });

    expect(await screen.findByRole('combobox', { name: 'Tema' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'Dagpenger (0)' })).not.toBeInTheDocument();
});

it('viser feil uten å slette URL-valgte tema når togglene ikke kan lastes', async () => {
    const feil = new FetchError(new Response(null, { status: 500 }), 'Kunne ikke laste feature toggles');
    vi.spyOn(featuretoggles, 'useFetch').mockImplementation(() =>
        useQuery<FeatureTogglesResponse, FetchError>({
            queryKey: featuretoggles.queryKey,
            queryFn: () => Promise.reject(feil)
        })
    );
    const store = renderFilter();

    expect(await screen.findByText(feil.message)).toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: 'Tema' })).not.toBeInTheDocument();
    expect(store.get(dokumenterFilterAtom).temaer).toEqual(['DAG']);
    expect(route.navigate).not.toHaveBeenCalled();
});

it.each([{ valgteTemaer: ['DAG', 'ANNET', 'UKJENT'] }, { valgteTemaer: ['ANNET', 'UKJENT'] }])(
    'fjerner ugyldige temavalg $valgteTemaer først etter at dokumentdataene er lastet',
    async ({ valgteTemaer }) => {
        route.search = { tema: valgteTemaer };
        dokumentdata.loaded = false;
        queryClient.setQueryData(featuretoggles.queryKey, toggles(true));
        const store = renderFilter();

        expect(store.get(dokumenterFilterAtom).temaer).toEqual(valgteTemaer);
        expect(route.navigate).not.toHaveBeenCalled();

        await act(async () => {
            dokumentdata.loaded = true;
            dokumentdata.listeners.forEach((listener) => {
                listener();
            });
        });

        const gyldigeValg = valgteTemaer.filter((tema) => tema === 'DAG');
        expect(store.get(dokumenterFilterAtom).temaer).toEqual(gyldigeValg);
        expect(route.navigate).toHaveBeenCalledExactlyOnceWith({
            search: { tema: gyldigeValg },
            replace: true
        });
    }
);
