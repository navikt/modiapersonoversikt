import { createStore } from 'redux';
import { featureToggleReducer, setFeatureToggleOff, setFeatureToggleOn } from './featureToggleReducer';

test('reducer legger til featuretoggle dersom den skrus på', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));

    expect(store.getState().turnedOn.includes('Daniel is in the house')).toBe(true);
    expect(store.getState().turnedOff.includes('Daniel is in the house')).toBe(false);
});

test('reducer legger ikke til featuretoggle dersom den allerede finnes', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOn('Daniel is in the house'));

    expect(store.getState().turnedOn.filter(entry => entry === 'Daniel is in the house')).toHaveLength(1);

    store.dispatch(setFeatureToggleOff('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));

    expect(store.getState().turnedOff.filter(entry => entry === 'Daniel is in the house')).toHaveLength(1);
});

test('reducer fjerner featuretoggle dersom den skrus av', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));

    expect(store.getState().turnedOn.includes('Daniel is in the house')).toBe(false);
    expect(store.getState().turnedOff.includes('Daniel is in the house')).toBe(true);
});

test('reducer holder tunga rett i munn', () => {
    const store = createStore(featureToggleReducer);

    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));
    store.dispatch(setFeatureToggleOn('Daniel is in the house'));

    expect(store.getState().turnedOn.includes('Daniel is in the house')).toBe(true);
    expect(store.getState().turnedOff.includes('Daniel is in the house')).toBe(false);

    store.dispatch(setFeatureToggleOff('Daniel is in the house'));
    store.dispatch(setFeatureToggleOn('Daniel is in the house'));
    store.dispatch(setFeatureToggleOff('Daniel is in the house'));

    expect(store.getState().turnedOn.includes('Daniel is in the house')).toBe(false);
    expect(store.getState().turnedOff.includes('Daniel is in the house')).toBe(true);
});
