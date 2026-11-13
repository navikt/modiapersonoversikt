import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter,
    Navigate,
    Outlet,
    RouterProvider
} from '@tanstack/react-router';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { createStore, Provider, useAtomValue } from 'jotai';
import { HttpResponse, http } from 'msw';
import { apiBaseUri } from 'src/api/config';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import { aktivBrukerAtom, aktivBrukerLastetAtom } from 'src/lib/state/context';
import { server } from 'src/mock/node';
import { aremark } from 'src/mock/persondata/aremark';
import featuretoggles from 'src/rest/resources/featuretogglesResource';
import HandleLegacyUrls from 'src/utils/HandleLegacyUrls';
import { vi } from 'vitest';
import LegacyModiaGate from './LegacyModiaGate';
import { nyModiaAtom, useNavigateToNewOrOldModia } from './NyModia';
import { toast } from './toasts';

vi.mock('./toasts', () => ({ toast: { warning: vi.fn() } }));

const LegacyView = vi.fn(() => (
    <>
        <div>Gammel visning</div>
        <Outlet />
    </>
));
const LegacyChild = vi.fn(() => <div>Gammel detalj</div>);
const toggles = (deaktiver: boolean) => ({
    [FeatureToggles.DeaktiverGammelModia]: deaktiver,
    [FeatureToggles.NyModiaKnapp]: false
});
let queryClient: QueryClient;
let store: ReturnType<typeof createStore>;

beforeEach(() => {
    localStorage.removeItem('ny-modia-v2');
    vi.clearAllMocks();
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
    store = createStore();
    store.set(aktivBrukerAtom, aremark.personIdent);
    store.set(aktivBrukerLastetAtom, true);
    store.set(nyModiaAtom, false);
});

afterEach(() => {
    cleanup();
    queryClient.clear();
    localStorage.removeItem('ny-modia-v2');
});

function VersjonsNavigasjon() {
    useNavigateToNewOrOldModia();
    return <Outlet />;
}

function NyMeldingsVisning() {
    const aktivBruker = useAtomValue(aktivBrukerAtom);
    return aktivBruker ? <div>Ny visning</div> : <Navigate to="/" />;
}

async function visRute(url: string, lastNyRute?: () => Promise<void>, handterLegacyUrls = false) {
    const root = createRootRoute({
        validateSearch: (search) => search,
        component: () =>
            handterLegacyUrls ? (
                <HandleLegacyUrls>
                    <VersjonsNavigasjon />
                </HandleLegacyUrls>
            ) : (
                <VersjonsNavigasjon />
            )
    });
    const person = createRoute({
        getParentRoute: () => root,
        path: '/person',
        component: () => (
            <LegacyModiaGate>
                <LegacyView />
            </LegacyModiaGate>
        )
    });
    const childRoutes = ['oversikt', 'meldinger', 'oppfolging', 'utbetaling', 'ytelser', 'varsler', 'saker', '$'].map(
        (path) => createRoute({ getParentRoute: () => person, path, component: LegacyChild })
    );
    const standaloneRoutes = ['/saker', '/dokument'].map((path) =>
        createRoute({
            getParentRoute: () => root,
            path,
            component: () => (
                <LegacyModiaGate>
                    <LegacyView />
                </LegacyModiaGate>
            )
        })
    );
    const newRoutes = [
        '/',
        '/new',
        '/new/person/hjem',
        '/new/person/meldinger',
        '/new/person/oppfolging',
        '/new/person/utbetaling',
        '/new/person/ytelser',
        '/new/person/varsler',
        '/new/person/dokumenter',
        '/new/dokument'
    ].map((path) =>
        createRoute({
            getParentRoute: () => root,
            path,
            component:
                handterLegacyUrls && path === '/new/person/meldinger' ? NyMeldingsVisning : () => <div>Ny visning</div>,
            loader: path.startsWith('/new') ? lastNyRute : undefined
        })
    );
    const router = createRouter({
        routeTree: root.addChildren([person.addChildren(childRoutes), ...standaloneRoutes, ...newRoutes]),
        history: createMemoryHistory({ initialEntries: [url] })
    });
    if (handterLegacyUrls) vi.spyOn(router, 'navigate');
    await act(async () => {
        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        );
        await router.load();
    });
    return router;
}

it.each([
    { deaktiver: false, harAktivBruker: true, maal: '/person/meldinger' },
    { deaktiver: true, harAktivBruker: true, maal: '/new/person/meldinger' },
    { deaktiver: false, harAktivBruker: false, maal: '/person/meldinger' },
    { deaktiver: true, harAktivBruker: false, maal: '/new' }
])(
    'avslutter inngangslenken uten redirect-løkke med sperre $deaktiver og aktiv person $harAktivBruker',
    async ({ deaktiver, harAktivBruker, maal }) => {
        store.set(aktivBrukerAtom, harAktivBruker ? aremark.personIdent : undefined);
        queryClient.setQueryData(featuretoggles.queryKey, toggles(deaktiver));
        const preferanse = localStorage.getItem('ny-modia-v2');
        const router = await visRute('/?henvendelseId=dialog-1', undefined, true);

        await waitFor(() => {
            expect(router.state.location.pathname).toBe(maal);
            expect(router.state.isLoading).toBe(false);
        });
        expect(router.state.location.search).toEqual(maal === '/new' ? {} : { traadId: 'dialog-1' });
        const navigasjoner = vi.mocked(router.navigate).mock.calls;
        expect(navigasjoner.filter(([options]) => options.to === '/new/person/meldinger')).toHaveLength(1);
        expect(navigasjoner.length).toBeLessThanOrEqual(5);
        expect(localStorage.getItem('ny-modia-v2')).toBe(preferanse);
    }
);

it.each([
    ['/person/oversikt', '/new/person/hjem', {}],
    ['/person/meldinger?traadId=dialog-1&ukjent=fjern', '/new/person/meldinger', { traadId: 'dialog-1' }],
    ['/person/oppfolging', '/new/person/oppfolging', {}],
    ['/person/utbetaling', '/new/person/utbetaling', {}],
    ['/person/utbetaling/1735689600', '/new/person/utbetaling', {}],
    ['/person/ytelser', '/new/person/ytelser', {}],
    ['/person/varsler', '/new/person/varsler', {}],
    ['/person/saker', '/new/person/dokumenter', {}],
    ['/saker', '/new/person/dokumenter', {}],
    [
        '/dokument?dokument=dokument-1&journalpost=journalpost-1',
        '/new/dokument',
        { dokument: 'dokument-1', journalpost: 'journalpost-1' }
    ],
    ['/person/ukjent/sti', '/new/person/hjem', {}],
    ['/person/meldinger-arkiv', '/new/person/hjem', {}],
    ['/person/ukjent/saker', '/new/person/hjem', {}],
    ['/person/dokumenter?dokument=dokument-1', '/new/person/hjem', {}]
])('sperrer %s uten å montere gammel visning', async (url, maal, search) => {
    queryClient.setQueryData(featuretoggles.queryKey, toggles(true));
    const preferanse = localStorage.getItem('ny-modia-v2');
    const router = await visRute(url);

    await waitFor(() => expect(router.state.location.pathname).toBe(maal));
    expect(router.state.location.search).toEqual(search);
    expect(LegacyView).not.toHaveBeenCalled();
    expect(LegacyChild).not.toHaveBeenCalled();
    expect(localStorage.getItem('ny-modia-v2')).toBe(preferanse);
});

it('sender til ny inngang uten aktiv person', async () => {
    store.set(aktivBrukerAtom, undefined);
    queryClient.setQueryData(featuretoggles.queryKey, toggles(true));
    const router = await visRute('/person/meldinger');

    await waitFor(() => expect(router.state.location.pathname).toBe('/new'));
    expect(LegacyView).not.toHaveBeenCalled();
});

it.each([
    ['/person/utbetaling', '/new/person/utbetaling', {}],
    ['/person/meldinger?traadId=dialog-1', '/new/person/meldinger', { traadId: 'dialog-1' }]
])('bevarer målet fra %s mens den nye ruten laster', async (url, maal, search) => {
    const { promise, resolve } = Promise.withResolvers<void>();
    queryClient.setQueryData(featuretoggles.queryKey, toggles(false));
    const router = await visRute(url, () => promise);
    await screen.findByText('Gammel visning');

    await act(() => queryClient.setQueryData(featuretoggles.queryKey, toggles(true)));
    await waitFor(() => expect(router.state.location.pathname).toBe(maal));
    expect(router.state.isLoading).toBe(true);
    expect(router.state.location.search).toEqual(search);
    expect(screen.queryByText('Gammel visning')).not.toBeInTheDocument();

    await act(async () => resolve());
    await waitFor(() => expect(router.state.isLoading).toBe(false));
    expect(router.state.location.pathname).toBe(maal);
    expect(router.state.location.search).toEqual(search);
    await screen.findByText('Ny visning');
});

it('venter på flagget før gammel visning kan monteres', async () => {
    const { promise, resolve } = Promise.withResolvers<Response>();
    server.use(http.get(`${apiBaseUri}/featuretoggle/`, () => promise));
    await visRute('/person/oversikt');

    expect(LegacyView).not.toHaveBeenCalled();
    expect(LegacyChild).not.toHaveBeenCalled();
    resolve(HttpResponse.json(toggles(false)));
    await screen.findByText('Gammel visning');
    expect(LegacyChild).toHaveBeenCalled();
});

it('avmonterer gammel visning når flagget slås på og bevarer gammel preferanse ved rollback', async () => {
    queryClient.setQueryData(featuretoggles.queryKey, toggles(false));
    const router = await visRute('/person/oversikt');
    await screen.findByText('Gammel visning');

    await act(() => queryClient.setQueryData(featuretoggles.queryKey, toggles(true)));
    await waitFor(() => expect(router.state.location.pathname).toBe('/new/person/hjem'));
    expect(screen.queryByText('Gammel visning')).not.toBeInTheDocument();
    expect(store.get(nyModiaAtom)).toBe(false);

    await act(() => queryClient.setQueryData(featuretoggles.queryKey, toggles(false)));
    await screen.findByText('Gammel visning');
    expect(store.get(nyModiaAtom)).toBe(false);
});

it.each(['/saker', '/dokument?dokument=dokument-1'])(
    'beholder gammel fullskjermsrute %s når flagget er av',
    async (url) => {
        queryClient.setQueryData(featuretoggles.queryKey, toggles(false));
        await visRute(url);

        await screen.findByText('Gammel visning');
        expect(LegacyView).toHaveBeenCalled();
    }
);

it.each([
    { harAktivBruker: true, maal: '/new/person/hjem' },
    { harAktivBruker: false, maal: '/new' }
])('velger riktig ny inngang fra forsiden med aktiv person $harAktivBruker', async ({ harAktivBruker, maal }) => {
    store.set(aktivBrukerAtom, harAktivBruker ? aremark.personIdent : undefined);
    queryClient.setQueryData(featuretoggles.queryKey, toggles(true));
    const router = await visRute('/');

    await waitFor(() => expect(router.state.location.pathname).toBe(maal));
    expect(LegacyView).not.toHaveBeenCalled();
});

it('sperrer gamle historikkoppføringer ved tilbake og frem', async () => {
    queryClient.setQueryData(featuretoggles.queryKey, toggles(false));
    const router = await visRute('/person/oversikt');
    await screen.findByText('Gammel visning');
    await act(() => router.navigate({ to: '/person/ytelser' }));

    await act(() => queryClient.setQueryData(featuretoggles.queryKey, toggles(true)));
    await waitFor(() => expect(router.state.location.pathname).toBe('/new/person/ytelser'));
    LegacyView.mockClear();
    LegacyChild.mockClear();

    await act(async () => {
        router.history.back();
        await router.load();
    });
    await waitFor(() => expect(router.state.location.pathname).toBe('/new/person/hjem'));

    await act(async () => {
        router.history.forward();
        await router.load();
    });
    await waitFor(() => expect(router.state.location.pathname).toBe('/new/person/ytelser'));
    expect(LegacyView).not.toHaveBeenCalled();
    expect(LegacyChild).not.toHaveBeenCalled();
});

it('venter på personkonteksten før den velger ny forside', async () => {
    store.set(aktivBrukerAtom, undefined);
    store.set(aktivBrukerLastetAtom, false);
    queryClient.setQueryData(featuretoggles.queryKey, toggles(true));
    const router = await visRute('/');

    expect(router.state.location.pathname).toBe('/');
    await act(() => {
        store.set(aktivBrukerAtom, aremark.personIdent);
        store.set(aktivBrukerLastetAtom, true);
    });
    await waitFor(() => expect(router.state.location.pathname).toBe('/new/person/hjem'));
});

it('bruker ny visning ved flaggfeil selv om den gamle versjonstogglen også feiler', async () => {
    server.use(http.get(`${apiBaseUri}/featuretoggle/`, () => HttpResponse.json({}, { status: 500 })));
    const router = await visRute('/person/oversikt');

    await waitFor(() => expect(router.state.location.pathname).toBe('/new/person/hjem'));
    expect(LegacyView).not.toHaveBeenCalled();
    expect(toast.warning).toHaveBeenCalledWith('Kunne ikke hente versjonsvalg. Ny Modia brukes.');
});
