import { Action, createStore } from 'redux';
import kontrollspørsmålReducer from './reducer';
import { roterKontrollSpørsmål, setKontrollSpørsmål, lukkKontrollSpørsmål } from './actions';
import { Sporsmaal } from './types';

const spm1: Sporsmaal = {
    sporsmaal: 'Spørsmål 1',
    svar: [{ tekst: 'svar til spørsmål 1' }]
};

const spm2: Sporsmaal = {
    sporsmaal: 'Spørsmål 2',
    svar: [{ tekst: 'svar til spørsmål 2' }]
};

const spm3: Sporsmaal = {
    sporsmaal: 'Spørsmål 3',
    svar: [{ tekst: 'svar til spørsmål 3' }]
};

describe('Kontrollspørsmål reducer', () => {
    it('har korrekt init state', () => {
        const action = invalidAction();
        const store = createStore(kontrollspørsmålReducer);

        store.dispatch(action);

        expect(store.getState().sporsmaal).toBeUndefined();
        expect(store.getState().open).toBe(true);
    });

    it('Setter nye spørsmål med SetSpørsmål', () => {
        const store = createStore(kontrollspørsmålReducer);

        store.dispatch(setKontrollSpørsmål([spm3]));

        store.dispatch(setKontrollSpørsmål(lagSpørsmål()));

        expect(store.getState().sporsmaal).toContain(spm1);
        expect(store.getState().sporsmaal).toContain(spm2);
        expect(store.getState().sporsmaal).not.toContain(spm3);
        expect(store.getState().open).toBe(true);
    });

    it('Roterer array korrekt', () => {
        const store = createStore(kontrollspørsmålReducer);

        store.dispatch(setKontrollSpørsmål(lagSpørsmål()));

        expect(store.getState().sporsmaal).not.toBeUndefined();
        expect((store.getState().sporsmaal as Sporsmaal[])[0]).toBe(spm1);
        expect((store.getState().sporsmaal as Sporsmaal[])[1]).toBe(spm2);

        store.dispatch(roterKontrollSpørsmål());

        expect(store.getState().sporsmaal).not.toBeUndefined();
        expect((store.getState().sporsmaal as Sporsmaal[])[0]).toBe(spm2);
        expect((store.getState().sporsmaal as Sporsmaal[])[1]).toBe(spm1);

        store.dispatch(roterKontrollSpørsmål());

        expect(store.getState().sporsmaal).not.toBeUndefined();
        expect((store.getState().sporsmaal as Sporsmaal[])[0]).toBe(spm1);
        expect((store.getState().sporsmaal as Sporsmaal[])[1]).toBe(spm2);
    });

    it('Toggler synlig korrekt', () => {
        const store = createStore(kontrollspørsmålReducer);

        expect(store.getState().open).toBe(true);

        store.dispatch(lukkKontrollSpørsmål());

        expect(store.getState().open).toBe(false);

        store.dispatch(lukkKontrollSpørsmål());

        expect(store.getState().open).toBe(false);
    });
});

function lagSpørsmål(): Sporsmaal[] {
    return [spm1, spm2];
}

function invalidAction(): Action {
    return {
        type: 'NO_ACTION'
    };
}
