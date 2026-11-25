import { onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import type { PropsWithChildren } from 'react';
import { FetchError } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { server } from '../../mock/node';
import featuretoggles, { type FeatureTogglesResponse } from '../../rest/resources/featuretogglesResource';
import { FeatureToggles } from './toggleIDs';
import useDeaktiverGammelModia from './useDeaktiverGammelModia';
import useFeatureToggle from './useFeatureToggle';

const toggleId = FeatureToggles.DeaktiverGammelModia;
const url = `${apiBaseUri}/featuretoggle/`;
let queryClient: QueryClient;

function wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

function svarMedToggles(toggles: Partial<FeatureTogglesResponse>) {
    server.use(http.get(url, () => HttpResponse.json(toggles)));
}

beforeEach(() => {
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
});

afterEach(() => {
    cleanup();
    queryClient.clear();
    onlineManager.setOnline(true);
});

it.each([
    { tilstand: 'flagget er av', toggles: { [toggleId]: false }, isOn: false },
    { tilstand: 'flagget er på', toggles: { [toggleId]: true }, isOn: true },
    { tilstand: 'flagget mangler i svaret', toggles: { [FeatureToggles.NyModiaKnapp]: true }, isOn: false }
])('venter på svaret når $tilstand', async ({ toggles, isOn }) => {
    svarMedToggles(toggles);
    const { result } = renderHook(useDeaktiverGammelModia, { wrapper });

    expect(result.current).toEqual({ status: 'pending' });
    await waitFor(() => expect(result.current).toEqual({ status: 'success', isOn }));
});

it('beholder ventetilstanden når første oppslag er satt på pause uten nett', () => {
    onlineManager.setOnline(false);
    const { result } = renderHook(useDeaktiverGammelModia, { wrapper });

    expect(result.current).toEqual({ status: 'pending' });
});

it('returnerer deaktivering og eksplisitt feil når oppslaget feiler', async () => {
    server.use(http.get(url, () => HttpResponse.json({}, { status: 500 })));
    const { result } = renderHook(useDeaktiverGammelModia, { wrapper });

    await waitFor(() =>
        expect(result.current).toEqual({
            status: 'error',
            isOn: true,
            error: expect.any(FetchError)
        })
    );
});

it('velger deaktivering ved feil selv om flagget tidligere var av', async () => {
    queryClient.setQueryData(featuretoggles.queryKey, { [toggleId]: false });
    server.use(http.get(url, () => HttpResponse.json({}, { status: 500 })));
    const { result } = renderHook(useDeaktiverGammelModia, { wrapper });

    await waitFor(() =>
        expect(result.current).toEqual({
            status: 'error',
            isOn: true,
            error: expect.any(FetchError)
        })
    );
});

it.each([
    { fra: false, til: true },
    { fra: true, til: false }
])('følger oppdaterte flaggdata fra $fra til $til', async ({ fra, til }) => {
    svarMedToggles({ [toggleId]: fra });
    const { result } = renderHook(useDeaktiverGammelModia, { wrapper });
    await waitFor(() => expect(result.current).toEqual({ status: 'success', isOn: fra }));

    svarMedToggles({ [toggleId]: til });
    await act(() => queryClient.invalidateQueries({ queryKey: featuretoggles.queryKey }));

    await waitFor(() => expect(result.current).toEqual({ status: 'success', isOn: til }));
});

it('deler flaggoppslaget med den eksisterende hooken og ber om det nye flagget', async () => {
    const forespurteFlagg: string[][] = [];
    server.use(
        http.get(url, ({ request }) => {
            forespurteFlagg.push(new URL(request.url).searchParams.get('id')?.split(',') ?? []);
            return HttpResponse.json({ [toggleId]: false, [FeatureToggles.NyModiaKnapp]: true });
        })
    );
    const { result } = renderHook(
        () => ({
            deaktivering: useDeaktiverGammelModia(),
            nyModiaKnapp: useFeatureToggle(FeatureToggles.NyModiaKnapp)
        }),
        { wrapper }
    );

    await waitFor(() => {
        expect(result.current.deaktivering).toEqual({ status: 'success', isOn: false });
        expect(result.current.nyModiaKnapp).toEqual({ pending: false, isOn: true });
    });
    expect(forespurteFlagg).toEqual([expect.arrayContaining([toggleId, FeatureToggles.NyModiaKnapp])]);
});
