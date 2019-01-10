import { createStore } from 'redux';
import { featureToggleReducer, setFeatureToggleOff, setFeatureToggleOn } from './featureToggleReducer';

test('reducer legger til featuretoggle dersom den skrus på', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));

    expect(store.getState()['Daniel is in the house']).toBe(true);
});

test('reducer fjerner featuretoggle dersom den skrus av', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));

    expect(store.getState()['Daniel is in the house']).toBe(false);
});

test('undefined dersom featuretoggle ikke er satt', () => {
    const store = createStore(featureToggleReducer);

    expect(store.getState()['Daniel is in the house']).toBe(undefined);
});

test('reducer holder tunga rett i munn', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));
    store.dispatch(setFeatureToggleOn('Daniel is in the house'));

    expect(store.getState()['Daniel is in the house']).toBe(true);

    store.dispatch(setFeatureToggleOff('Daniel is in the house'));
    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));

    expect(store.getState()['Daniel is in the house']).toBe(false);
});
