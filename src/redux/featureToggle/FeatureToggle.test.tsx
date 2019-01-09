import * as React from 'react';
import { createStore } from 'redux';
import reducers from '../reducers';
import { setFeatureToggleOff, setFeatureToggleOn } from './featureToggleReducer';
import FeatureToggle from './FeatureToggle';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import FeatureToggleOff from './FeatureToggleOff';
import LazySpinner from '../../components/LazySpinner';

const toggleId = 'Min første feature-toggle';

FeatureToggle.prototype.componentDidMount = () => null;

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    const store = createStore(reducers);
    store.dispatch(setFeatureToggleOn(toggleId));

    const result = mount(
        <Provider store={store}>
            <FeatureToggle toggleID={toggleId}>Her er jeg</FeatureToggle>
        </Provider>
    );

    expect(result.text()).toContain('Her er jeg');
});

test('viser innhold i FeatureToggleOff dersom feature-toggle er av', () => {
    const store = createStore(reducers);
    store.dispatch(setFeatureToggleOff(toggleId));

    const result = mount(
        <Provider store={store}>
            <FeatureToggleOff toggleID={toggleId}>Her er jeg</FeatureToggleOff>
        </Provider>
    );

    expect(result.text()).toContain('Her er jeg');
});

test('viser ikke innhold dersom feature-toggle ikke er satt', () => {
    const store = createStore(reducers);

    const result = mount(
        <Provider store={store}>
            <>
                <FeatureToggle toggleID={toggleId}>Her er jeg</FeatureToggle>
                <FeatureToggleOff toggleID={toggleId}>Og her er jeg</FeatureToggleOff>
            </>
        </Provider>
    );

    expect(result.html()).toBeNull();
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    const store = createStore(reducers);

    const result = mount(
        <Provider store={store}>
            <FeatureToggle toggleID={toggleId}>Her er jeg</FeatureToggle>
        </Provider>
    );

    expect(result.contains(<LazySpinner type="S" delay={1000}/>)).toBe(true);
});
