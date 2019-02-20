import { Action, createStore } from 'redux';
import kontrollspørsmålReducer from './reducer';
import { roterKontrollSpørsmål, setKontrollSpørsmål, lukkKontrollSpørsmål } from './actions';
import { Spørsmål } from './types';

const spm1: Spørsmål = {
    spørsmål: 'Spørsmål 1',
    svar: [{ tekst: 'svar til spørsmål 1' }]
};

const spm2: Spørsmål = {
    spørsmål: 'Spørsmål 2',
    svar: [{ tekst: 'svar til spørsmål 2' }]
};

const spm3: Spørsmål = {
    spørsmål: 'Spørsmål 3',
    svar: [{ tekst: 'svar til spørsmål 3' }]
};

describe('Kontrollspørsmål reducer', () => {
    it('har korrekt init state', () => {
        const action = invalidAction();
        const store = createStore(kontrollspørsmålReducer);

        store.dispatch(action);

        expect(store.getState().spørsmål).toBeUndefined();
        expect(store.getState().synlig).toBe(true);
    });

    it('Setter nye spørsmål med SetSpørsmål', () => {
        const store = createStore(kontrollspørsmålReducer);

        store.dispatch(setKontrollSpørsmål([spm3]));

        store.dispatch(setKontrollSpørsmål(lagSpørsmål()));

        expect(store.getState().spørsmål).toContain(spm1);
        expect(store.getState().spørsmål).toContain(spm2);
        expect(store.getState().spørsmål).not.toContain(spm3);
        expect(store.getState().synlig).toBe(true);
    });

    it('Roterer array korrekt', () => {
        const store = createStore(kontrollspørsmålReducer);

        store.dispatch(setKontrollSpørsmål(lagSpørsmål()));

        expect(store.getState().spørsmål).not.toBeUndefined();
        expect((store.getState().spørsmål as Spørsmål[])[0]).toBe(spm1);
        expect((store.getState().spørsmål as Spørsmål[])[1]).toBe(spm2);

        store.dispatch(roterKontrollSpørsmål());

        expect(store.getState().spørsmål).not.toBeUndefined();
        expect((store.getState().spørsmål as Spørsmål[])[0]).toBe(spm2);
        expect((store.getState().spørsmål as Spørsmål[])[1]).toBe(spm1);

        store.dispatch(roterKontrollSpørsmål());

        expect(store.getState().spørsmål).not.toBeUndefined();
        expect((store.getState().spørsmål as Spørsmål[])[0]).toBe(spm1);
        expect((store.getState().spørsmål as Spørsmål[])[1]).toBe(spm2);
    });

    it('Toggler synlig korrekt', () => {
        const store = createStore(kontrollspørsmålReducer);

        expect(store.getState().synlig).toBe(true);

        store.dispatch(lukkKontrollSpørsmål());

        expect(store.getState().synlig).toBe(false);

        store.dispatch(lukkKontrollSpørsmål());

        expect(store.getState().synlig).toBe(false);
    });
});

function lagSpørsmål(): Spørsmål[] {
    return [spm1, spm2];
}

function invalidAction(): Action {
    return {
        type: 'NO_ACTION'
    };
}
