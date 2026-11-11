import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import { nyMeldingUnderArbeidAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';
import { draftAtom } from 'src/lib/state/draft';
import { type Traad, TraadType } from 'src/lib/types/modiapersonoversikt-api';
import { referatResultatAtom } from './MeldingPanel';
import { SkrivNyMeldingKnapp } from './SkrivNyMeldingKnapp';
import { SvarPaaTraadKnapp } from './SvarPaaTraadKnapp';

vi.mock('./SendMelding', () => ({ SendMelding: () => null }));
vi.mock('src/utils/analytics', () => ({
    trackGenereltUmamiEvent: vi.fn(),
    trackingEvents: {}
}));

const traad: Traad = {
    traadId: 'valgt-traad',
    fnr: '00000000000',
    traadType: TraadType.SAMTALEREFERAT,
    temagruppe: 'PENS',
    feilsendt: false,
    meldinger: [],
    journalposter: [],
    journalforingFeilet: false
};

test.each(['ny melding', 'svar'])('tømmer kvittering når brukeren starter %s', async (handling) => {
    const user = userEvent.setup();
    const store = createStore();
    store.set(referatResultatAtom, {
        fnr: traad.fnr,
        enhet: '0101',
        variant: 'success',
        melding: 'Referatet er sendt og journalført.'
    });
    render(
        <Provider store={store}>
            {handling === 'ny melding' ? <SkrivNyMeldingKnapp /> : <SvarPaaTraadKnapp traad={traad} />}
        </Provider>
    );

    await user.click(screen.getByRole('button', { name: handling === 'ny melding' ? 'Skriv ny melding' : 'Svar' }));

    expect(store.get(referatResultatAtom)).toBeNull();
    expect(store.get(nyMeldingUnderArbeidAtom)).toBe(handling === 'ny melding');
    expect(store.get(svarUnderArbeidAtom)).toBe(handling === 'svar' ? traad.traadId : undefined);
});

test.each(['ny melding', 'svar'])('beholder kvitteringen frem til bekreftet bytte til %s', async (handling) => {
    const user = userEvent.setup();
    const store = createStore();
    const kvittering = {
        fnr: traad.fnr,
        enhet: '0101',
        variant: 'error' as const,
        melding: 'Referatet er sendt, men journalføringen feilet.'
    };
    store.set(referatResultatAtom, kvittering);
    store.set(draftAtom, 'Et utkast');
    store.set(svarUnderArbeidAtom, 'annen-traad');
    render(
        <Provider store={store}>
            {handling === 'ny melding' ? <SkrivNyMeldingKnapp /> : <SvarPaaTraadKnapp traad={traad} />}
        </Provider>
    );
    const startKnapp = screen.getByRole('button', { name: handling === 'ny melding' ? 'Skriv ny melding' : 'Svar' });

    await user.click(startKnapp);
    expect(store.get(referatResultatAtom)).toEqual(kvittering);
    await user.click(screen.getByRole('button', { name: 'Nei' }));
    expect(store.get(referatResultatAtom)).toEqual(kvittering);

    await user.click(startKnapp);
    await user.click(screen.getByRole('button', { name: 'Ja' }));

    expect(store.get(referatResultatAtom)).toBeNull();
    expect(store.get(nyMeldingUnderArbeidAtom)).toBe(handling === 'ny melding');
    expect(store.get(svarUnderArbeidAtom)).toBe(handling === 'svar' ? traad.traadId : undefined);
});
