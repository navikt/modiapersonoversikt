import { act, cleanup, renderHook } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { FetchError } from 'src/api/api';
import useDeaktiverGammelModia from 'src/components/featureToggle/useDeaktiverGammelModia';
import { nyModiaAtom } from 'src/components/NyModia';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { vi } from 'vitest';
import { useSettAktivBruker } from './useSettAktivBruker';

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock('@tanstack/react-router', async (importOriginal) => ({
    ...(await importOriginal<typeof import('@tanstack/react-router')>()),
    useNavigate: () => navigate
}));
vi.mock('src/components/featureToggle/useDeaktiverGammelModia', () => ({ default: vi.fn() }));

const originalUrl = window.location.href;
let store: ReturnType<typeof createStore>;

function wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
}

beforeEach(() => {
    vi.clearAllMocks();
    navigate.mockResolvedValue(undefined);
    localStorage.removeItem('ny-modia-v2');
    store = createStore();
    store.set(nyModiaAtom, false);
    window.history.replaceState(null, '', '/new');
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: false });
});

afterEach(() => {
    cleanup();
    localStorage.removeItem('ny-modia-v2');
    window.history.replaceState(null, '', originalUrl);
});

it.each([
    { state: { status: 'success', isOn: false }, nyModia: false, to: '/person' },
    { state: { status: 'success', isOn: false }, nyModia: true, to: '/new/person/hjem' },
    { state: { status: 'success', isOn: true }, nyModia: false, to: '/new/person/hjem' },
    {
        state: { status: 'error', isOn: true, error: new FetchError(new Response(null, { status: 500 })) },
        nyModia: false,
        to: '/new/person/hjem'
    }
] as const)('velger $to med flaggstatus $state.status og preferanse $nyModia', ({ state, nyModia, to }) => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue(state);
    store.set(nyModiaAtom, nyModia);
    const { result } = renderHook(useSettAktivBruker, { wrapper });

    act(() => result.current('11111111111'));

    expect(navigate).toHaveBeenCalledExactlyOnceWith({ to });
    expect(store.get(aktivBrukerAtom)).toBe('11111111111');
    expect(store.get(nyModiaAtom)).toBe(nyModia);
});

it.each([false, true])('beholder rotinngangen ved nullstilling når sperren er %s', (isOn) => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn });
    store.set(aktivBrukerAtom, '11111111111');
    const { result } = renderHook(useSettAktivBruker, { wrapper });

    act(() => result.current(null));

    expect(navigate).toHaveBeenCalledExactlyOnceWith({ to: '/' });
    expect(store.get(aktivBrukerAtom)).toBe('');
});

it('lar deep-link-adapteren styre navigasjon når redirect er av', () => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: true });
    const { result } = renderHook(useSettAktivBruker, { wrapper });

    act(() => result.current('11111111111', false));

    expect(navigate).not.toHaveBeenCalled();
    expect(store.get(aktivBrukerAtom)).toBe('11111111111');
});

it('beholder åpen ny personside ved personbytte med aktiv sperre', () => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: true });
    window.history.replaceState(null, '', '/new/person/utbetaling');
    const { result } = renderHook(useSettAktivBruker, { wrapper });

    act(() => result.current('11111111111'));

    expect(navigate).not.toHaveBeenCalled();
    expect(window.location.pathname).toBe('/new/person/utbetaling');
});
