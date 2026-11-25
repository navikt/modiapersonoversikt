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

it('skjuler versjonsvalget mens flagget lastes', () => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'pending' });
    render(<NyModiaSwitch />, { wrapper });

    expect(screen.queryByLabelText('Ny Modia')).not.toBeInTheDocument();
    expect(store.get(nyModiaAtom)).toBe(false);
});

it.each([
    { status: 'success', isOn: true },
    { status: 'error', isOn: true, error: new FetchError(new Response(null, { status: 500 })) }
] as const)('låser versjonsvalget ved $status uten å endre preferansen', (state) => {
    vi.mocked(useDeaktiverGammelModia).mockReturnValue(state);
    vi.mocked(useFeatureToggle).mockReturnValue({ pending: false, isOn: false });
    const preferanse = localStorage.getItem('ny-modia-v2');
    render(<NyModiaSwitch />, { wrapper });

    const input = screen.getByLabelText('Ny Modia', { selector: 'input' });
    const menuitem = screen.getByRole('menuitem', { name: 'Ny Modia' });
    expect(input).toBeDisabled();
    expect(input).toBeChecked();
    expect(menuitem).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(menuitem);
    fireEvent.keyDown(menuitem, { key: 'Enter' });
    fireEvent.keyDown(menuitem, { key: ' ' });
    act(() => vi.advanceTimersByTime(200));
    expect(store.get(nyModiaAtom)).toBe(false);
    expect(localStorage.getItem('ny-modia-v2')).toBe(preferanse);
    expect(trackToggleNyModia).not.toHaveBeenCalled();

    act(() => {
        menuitem.focus();
        vi.advanceTimersByTime(200);
    });
    expect(menuitem).toHaveFocus();
    expect(screen.getByRole('tooltip')).toHaveTextContent(
        state.status === 'error'
            ? 'Versjonsvalg er utilgjengelig. Ny Modia brukes.'
            : 'Gamle Modia er fjernet. Du kan ikke bytte tilbake.'
    );
});

it('avbryter et påbegynt versjonsbytte når gammel Modia deaktiveres', () => {
    store.set(nyModiaAtom, true);
    const preferanse = localStorage.getItem('ny-modia-v2');
    const view = render(<NyModiaSwitch />, { wrapper });
    fireEvent.click(screen.getByLabelText('Ny Modia', { selector: 'input' }));

    vi.mocked(useDeaktiverGammelModia).mockReturnValue({ status: 'success', isOn: true });
    view.rerender(<NyModiaSwitch />);
    act(() => vi.advanceTimersByTime(200));

    expect(screen.getByLabelText('Ny Modia', { selector: 'input' })).toBeChecked();
    expect(store.get(nyModiaAtom)).toBe(true);
    expect(localStorage.getItem('ny-modia-v2')).toBe(preferanse);
    expect(trackToggleNyModia).not.toHaveBeenCalled();
});

it('beholder versjonsvalget og forsinkelsen når gammel visning er tilgjengelig', () => {
    render(<NyModiaSwitch />, { wrapper });

    fireEvent.click(screen.getByLabelText('Ny Modia', { selector: 'input' }));
    expect(screen.getByLabelText('Ny Modia', { selector: 'input' })).toBeChecked();
    expect(store.get(nyModiaAtom)).toBe(false);

    act(() => vi.advanceTimersByTime(200));
    expect(store.get(nyModiaAtom)).toBe(true);
    expect(trackToggleNyModia).toHaveBeenCalledWith(true);
});

it.each(['Enter', ' '])('bytter versjon med %s når wrapperen har tastaturfokus', (key) => {
    render(<NyModiaSwitch />, { wrapper });
    const menuitem = screen.getByRole('menuitem', { name: 'Ny Modia' });
    menuitem.focus();
    fireEvent.keyDown(menuitem, { key });

    expect(screen.getByLabelText('Ny Modia', { selector: 'input' })).toBeChecked();
    expect(store.get(nyModiaAtom)).toBe(false);

    act(() => vi.advanceTimersByTime(200));
    expect(store.get(nyModiaAtom)).toBe(true);
    expect(trackToggleNyModia).toHaveBeenCalledExactlyOnceWith(true);
});
