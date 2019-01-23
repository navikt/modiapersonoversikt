import * as React from 'react';
import { createStore } from 'redux';
import reducers from '../reducers';
import { setFeatureToggleOff, setFeatureToggleOn } from './featureToggleReducer';
import { mount } from 'enzyme';
import IfFeatureToggleOff from './IfFeatureToggleOff';
import LazySpinner from '../../components/LazySpinner';
import IfFeatureToggleOn from './IfFeatureToggleOn';
import TestProvider from '../../test/Testprovider';
import FeatureToggle from './FeatureToggle';

const toggleId = 'Min første feature-toggle';

beforeEach(() => {
    FeatureToggle.prototype.render = FeatureToggle.prototype.actualRender;
    FeatureToggle.prototype.componentDidMount = () => null;
});

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    const store = createStore(reducers);
    store.dispatch(setFeatureToggleOn(toggleId));

    const result = mount(
        <TestProvider customStore={store}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er på');
});

test('viser innhold i IfFeatureToggleOff dersom feature-toggle er av', () => {
    const store = createStore(reducers);
    store.dispatch(setFeatureToggleOff(toggleId));

    const result = mount(
        <TestProvider customStore={store}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    const store = createStore(reducers);

    const result = mount(
        <TestProvider customStore={store}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.contains(<LazySpinner type="S" delay={1000}/>)).toBe(true);
});
