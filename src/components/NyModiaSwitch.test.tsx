import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { FetchError } from 'src/api/api';
import { trackToggleNyModia } from 'src/utils/analytics';
import { vi } from 'vitest';
import useDeaktiverGammelModia from './featureToggle/useDeaktiverGammelModia';
import useFeatureToggle from './featureToggle/useFeatureToggle';
import { nyModiaAtom } from './NyModia';
import { NyModiaSwitch } from './NyModiaSwitch';

vi.mock('./featureToggle/useDeaktiverGammelModia', () => ({ default: vi.fn() }));
vi.mock('./featureToggle/useFeatureToggle', () => ({ default: vi.fn() }));
vi.mock('src/utils/analytics', () => ({ trackToggleNyModia: vi.fn() }));

let store: ReturnType<typeof createStore>;

function wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    localStorage.removeItem('ny-modia-v2');
    store = createStore();
    store.set(nyModiaAtom, false);
    vi.mocked(useFeatureToggle).mockReturnValue({ pending: false, isOn: true });
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: false });
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    localStorage.removeItem('ny-modia-v2');
});

it.each([
    { status: 'pending' },
    { status: 'success', isOn: true },
    { status: 'error', isOn: true, error: new FetchError(new Response(null, { status: 500 })) }
] as const)('skjuler versjonsvalget ved $status når gammel visning ikke er tilgjengelig', (state) => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue(state);
    render(<NyModiaSwitch />, { wrapper });

    expect(screen.queryByLabelText('Ny Modia')).not.toBeInTheDocument();
    expect(store.get(nyModiaAtom)).toBe(false);
});

it('beholder versjonsvalget og forsinkelsen når gammel visning er tilgjengelig', () => {
    render(<NyModiaSwitch />, { wrapper });

    fireEvent.click(screen.getByLabelText('Ny Modia'));
    expect(screen.getByLabelText('Ny Modia')).toBeChecked();
    expect(store.get(nyModiaAtom)).toBe(false);

    act(() => vi.advanceTimersByTime(200));
    expect(store.get(nyModiaAtom)).toBe(true);
    expect(trackToggleNyModia).toHaveBeenCalledWith(true);
});
