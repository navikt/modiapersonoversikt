import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { FetchError } from 'src/api/api';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useDeaktiverGammelModia from 'src/components/featureToggle/useDeaktiverGammelModia';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import featuretoggles from 'src/rest/resources/featuretogglesResource';
import { vi } from 'vitest';
import { NyModiaDropdownMeny } from './NyModiaDropdownMeny';

vi.mock('src/components/featureToggle/useDeaktiverGammelModia', () => ({ default: vi.fn() }));
vi.mock('src/components/featureToggle/useFeatureToggle', () => ({ default: vi.fn() }));

beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useFeatureToggle).mockReturnValue({ pending: false, isOn: true });
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: false });
});

afterEach(cleanup);

async function aapneMeny(queryClient?: QueryClient) {
    const store = createStore();
    const result = render(<NyModiaDropdownMeny />, {
        wrapper: ({ children }: PropsWithChildren) => (
            <Provider store={store}>
                {queryClient ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : children}
            </Provider>
        )
    });
    await userEvent.setup().click(screen.getByRole('button', { name: 'Åpne handlinger for ny Modia' }));
    await screen.findByRole('menu');
    return result;
}

it('skjuler versjonsgruppen mens flagget lastes', async () => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'pending' });
    await aapneMeny();

    expect(screen.queryByText('Velg versjon')).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});

it.each([
    { status: 'success', isOn: true },
    { status: 'error', isOn: true, error: new FetchError(new Response(null, { status: 500 })) }
] as const)('beholder deaktivert versjonsvalg og tooltip ved $status', async (state) => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue(state);
    vi.mocked(useFeatureToggle).mockReturnValue({ pending: false, isOn: false });
    await aapneMeny();

    expect(screen.getByText('Velg versjon')).toBeVisible();
    expect(screen.getByRole('separator')).toBeVisible();
    const versjonsvalg = screen.getByRole('menuitem', { name: 'Ny Modia' });
    expect(versjonsvalg).toHaveAttribute('aria-disabled', 'true');
    await userEvent.setup().hover(versjonsvalg);
    expect(await screen.findByRole('tooltip')).toHaveTextContent(
        state.status === 'error'
            ? 'Versjonsvalg er utilgjengelig. Ny Modia brukes.'
            : 'Gamle Modia er fjernet. Du kan ikke bytte tilbake.'
    );
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});

it('beholder gruppen og låser versjonsvalget når gammel Modia deaktiveres mens menyen er åpen', async () => {
    const { default: useDeaktiverGammelModiaOriginal } = await vi.importActual<
        typeof import('src/components/featureToggle/useDeaktiverGammelModia')
    >('src/components/featureToggle/useDeaktiverGammelModia');
    vi.mocked(useDeaktiverGammelModia).mockImplementation(useDeaktiverGammelModiaOriginal);
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, retry: false } } });
    queryClient.setQueryData(featuretoggles.queryKey, { [FeatureToggles.DeaktiverGammelModia]: false });
    await aapneMeny(queryClient);
    expect(screen.getByText('Velg versjon')).toBeVisible();
    expect(screen.getByRole('separator')).toBeVisible();

    await act(() => queryClient.setQueryData(featuretoggles.queryKey, { [FeatureToggles.DeaktiverGammelModia]: true }));

    expect(screen.getByText('Velg versjon')).toBeVisible();
    expect(screen.getByRole('separator')).toBeVisible();
    await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Ny Modia' })).toHaveAttribute('aria-disabled', 'true')
    );
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});

it('skjuler versjonsgruppen også når den opprinnelige versjonstogglen er av', async () => {
    vi.mocked(useFeatureToggle).mockReturnValue({ pending: false, isOn: false });
    await aapneMeny();

    expect(screen.queryByText('Velg versjon')).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});
