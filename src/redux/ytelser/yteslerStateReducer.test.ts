import { setVistYtelse, ytelserStateReducer, YtelseValg } from './yteslerStateReducer';
import { createStore } from 'redux';

test('setter ny ytelse som valgt ytelse', () => {
    const store = createStore(ytelserStateReducer);
    const stateBefore = store.getState();

    store.dispatch(setVistYtelse(YtelseValg.Sykepenger));

    const stateAfter = store.getState();

    expect(stateBefore).not.toEqual(stateAfter);
    expect(stateAfter.valgtYtelse).toEqual(YtelseValg.Sykepenger);
});
