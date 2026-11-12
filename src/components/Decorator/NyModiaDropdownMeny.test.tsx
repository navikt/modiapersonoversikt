import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { FetchError } from 'src/api/api';
import useDeaktiverGammelModia from 'src/components/featureToggle/useDeaktiverGammelModia';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
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

async function aapneMeny() {
    const store = createStore();
    const result = render(<NyModiaDropdownMeny />, {
        wrapper: ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>
    });
    await userEvent.setup().click(screen.getByRole('button', { name: 'Åpne handlinger for ny Modia' }));
    await screen.findByRole('menu');
    return result;
}

it.each([
    { status: 'pending' },
    { status: 'success', isOn: true },
    { status: 'error', isOn: true, error: new FetchError(new Response(null, { status: 500 })) }
] as const)('skjuler hele versjonsgruppen ved $status når gammel visning ikke er tilgjengelig', async (state) => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue(state);
    await aapneMeny();

    expect(screen.queryByText('Velg versjon')).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});

it('fjerner overskrift og skillelinje når gammel visning deaktiveres mens menyen er åpen', async () => {
    const { rerender } = await aapneMeny();
    expect(screen.getByText('Velg versjon')).toBeVisible();
    expect(screen.getByRole('separator')).toBeVisible();

    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: true });
    rerender(<NyModiaDropdownMeny />);

    expect(screen.queryByText('Velg versjon')).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});

it('skjuler versjonsgruppen også når den opprinnelige versjonstogglen er av', async () => {
    vi.mocked(useFeatureToggle).mockReturnValue({ pending: false, isOn: false });
    await aapneMeny();

    expect(screen.queryByText('Velg versjon')).not.toBeInTheDocument();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Introduksjon' })).toBeVisible();
});
