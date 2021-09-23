import { Action, createStore } from 'redux';
import kontrollsporsmalReducer from './reducer';
import { roterKontrollSporsmal, setKontrollSporsmal, lukkKontrollSporsmal } from './actions';
import { Sporsmal } from './types';

const spm1: Sporsmal = {
    sporsmal: 'Spørsmål 1',
    svar: [{ tekst: 'svar til spørsmål 1' }]
};

const spm2: Sporsmal = {
    sporsmal: 'Spørsmål 2',
    svar: [{ tekst: 'svar til spørsmål 2' }]
};

const spm3: Sporsmal = {
    sporsmal: 'Spørsmål 3',
    svar: [{ tekst: 'svar til spørsmål 3' }]
};

describe('Kontrollspørsmål reducer', () => {
    it('har korrekt init state', () => {
        const action = invalidAction();
        const store = createStore(kontrollsporsmalReducer);

        store.dispatch(action);

        expect(store.getState().sporsmal).toBeUndefined();
        expect(store.getState().open).toBe(true);
    });

    it('Setter nye spørsmål med SetSpørsmål', () => {
        const store = createStore(kontrollsporsmalReducer);

        store.dispatch(setKontrollSporsmal([spm3]));

        store.dispatch(setKontrollSporsmal(lagSporsmal()));

        expect(store.getState().sporsmal).toContain(spm1);
        expect(store.getState().sporsmal).toContain(spm2);
        expect(store.getState().sporsmal).not.toContain(spm3);
        expect(store.getState().open).toBe(true);
    });

    it('Roterer array korrekt', () => {
        const store = createStore(kontrollsporsmalReducer);

        store.dispatch(setKontrollSporsmal(lagSporsmal()));

        expect(store.getState().sporsmal).not.toBeUndefined();
        expect((store.getState().sporsmal as Sporsmal[])[0]).toBe(spm1);
        expect((store.getState().sporsmal as Sporsmal[])[1]).toBe(spm2);

        store.dispatch(roterKontrollSporsmal());

        expect(store.getState().sporsmal).not.toBeUndefined();
        expect((store.getState().sporsmal as Sporsmal[])[0]).toBe(spm2);
        expect((store.getState().sporsmal as Sporsmal[])[1]).toBe(spm1);

        store.dispatch(roterKontrollSporsmal());

        expect(store.getState().sporsmal).not.toBeUndefined();
        expect((store.getState().sporsmal as Sporsmal[])[0]).toBe(spm1);
        expect((store.getState().sporsmal as Sporsmal[])[1]).toBe(spm2);
    });

    it('Toggler synlig korrekt', () => {
        const store = createStore(kontrollsporsmalReducer);

        expect(store.getState().open).toBe(true);

        store.dispatch(lukkKontrollSporsmal());

        expect(store.getState().open).toBe(false);

        store.dispatch(lukkKontrollSporsmal());

        expect(store.getState().open).toBe(false);
    });
});

function lagSporsmal(): Sporsmal[] {
    return [spm1, spm2];
}

function invalidAction(): Action {
    return {
        type: 'NO_ACTION'
    };
}
