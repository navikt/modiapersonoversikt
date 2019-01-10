import * as React from 'react';
import { createStore } from 'redux';
import reducers from '../reducers';
import { setFeatureToggleOff, setFeatureToggleOn } from './featureToggleReducer';
import FeatureToggle from './FeatureToggle';
import { mount } from 'enzyme';
import DisplayWhenFeatureToggleOff from './DisplayWhenFeatureToggleOff';
import LazySpinner from '../../components/LazySpinner';
import DisplayWhenFeatureToggleOn from './DisplayWhenFeatureToggleOn';
import TestProvider from '../../test/Testprovider';

const toggleId = 'Min første feature-toggle';

FeatureToggle.prototype.componentDidMount = () => null;

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    const store = createStore(reducers);
    store.dispatch(setFeatureToggleOn(toggleId));

    const result = mount(
        <TestProvider customStore={store}>
            <DisplayWhenFeatureToggleOn toggleID={toggleId}>Jeg er på</DisplayWhenFeatureToggleOn>
            <DisplayWhenFeatureToggleOff toggleID={toggleId}>Jeg er av</DisplayWhenFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er på');
});

test('viser innhold i DisplayWhenFeatureToggleOff dersom feature-toggle er av', () => {
    const store = createStore(reducers);
    store.dispatch(setFeatureToggleOff(toggleId));

    const result = mount(
        <TestProvider customStore={store}>
            <DisplayWhenFeatureToggleOn toggleID={toggleId}>Jeg er på</DisplayWhenFeatureToggleOn>
            <DisplayWhenFeatureToggleOff toggleID={toggleId}>Jeg er av</DisplayWhenFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    const store = createStore(reducers);

    const result = mount(
        <TestProvider customStore={store}>
            <DisplayWhenFeatureToggleOn toggleID={toggleId}>Jeg er på</DisplayWhenFeatureToggleOn>
            <DisplayWhenFeatureToggleOff toggleID={toggleId}>Jeg er av</DisplayWhenFeatureToggleOff>
        </TestProvider>
    );

    expect(result.contains(<LazySpinner type="S" delay={1000}/>)).toBe(true);
});
