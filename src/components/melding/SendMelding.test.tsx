import { act, cleanup, render, screen } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import type { PropsWithChildren } from 'react';
import { aktivBrukerAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { dialogSuksessMeldingAtom, MeldingPanel, referatResultatAtom } from './MeldingPanel';

vi.mock('react-resizable-panels', () => ({
    Panel: ({ children }: PropsWithChildren) => children
}));
vi.mock('src/components/Meldinger/List/utils', () => ({
    useTraader: () => ({ data: [], isLoading: false })
}));
vi.mock('src/lib/clients/modiapersonoversikt-api', () => ({
    useMeldinger: () => ({ isPending: false })
}));
vi.mock('./NyMelding', () => ({ default: () => null }));
vi.mock('./FortsettDialog', () => ({ FortsettDialog: () => null }));
vi.mock('./ReservertIKRRAlert', () => ({ ReservertIKRRAlert: () => null }));
vi.mock('./IkkeOppgavebehandlendeEnhetAlert', () => ({ IkkeOppgavebehandlendeEnhetAlert: () => null }));

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

test.each(['vanlig melding', 'journalført referat'])('lukker panelet etter to sekunder ved suksess for %s', (type) => {
    const store = createStore();
    store.set(aktivBrukerAtom, '00000000000');
    store.set(aktivEnhetAtom, '0101');
    const melding = type === 'vanlig melding' ? 'Melding sendt' : 'Referatet er sendt, og journalføring er startet.';
    if (type === 'vanlig melding') {
        store.set(dialogSuksessMeldingAtom, melding);
    } else {
        store.set(referatResultatAtom, {
            fnr: '00000000000',
            enhet: '0101',
            variant: 'success',
            melding
        });
    }
    const { container } = render(
        <Provider store={store}>
            <MeldingPanel />
        </Provider>
    );

    expect(screen.getByText(melding)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1999));
    expect(screen.getByText(melding)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));

    expect(container).toBeEmptyDOMElement();
    expect(store.get(referatResultatAtom)).toBeNull();
    expect(store.get(dialogSuksessMeldingAtom)).toBeNull();
});

test.each([
    'Referatet er sendt, men journalføringen feilet.',
    'Vi kunne ikke bekrefte om referatet ble sendt og journalført.'
])('beholder panelet åpent ved feil: %s', (melding) => {
    const store = createStore();
    store.set(aktivBrukerAtom, '00000000000');
    store.set(aktivEnhetAtom, '0101');
    store.set(referatResultatAtom, {
        fnr: '00000000000',
        enhet: '0101',
        variant: 'error',
        melding
    });
    render(
        <Provider store={store}>
            <MeldingPanel />
        </Provider>
    );

    act(() => vi.advanceTimersByTime(5000));

    expect(screen.getByText(melding)).toBeInTheDocument();
    expect(store.get(referatResultatAtom)?.variant).toBe('error');
});
