import * as React from 'react';
import { mount } from 'enzyme';
import IfFeatureToggleOff from './IfFeatureToggleOff';
import LazySpinner from '../LazySpinner';
import IfFeatureToggleOn from './IfFeatureToggleOn';
import TestProvider from '../../test/Testprovider';
import FeatureToggle from './FeatureToggle';
import { getTestStore } from '../../setupTests';
import { featureToggleActionNames } from '../../redux/restReducers/featureToggles';
import { FeatureToggles } from './toggleIDs';

const toggleId = FeatureToggles.Tooltip;
const testStore = getTestStore();

beforeEach(() => {
    FeatureToggle.prototype.render = FeatureToggle.prototype.actualRender;
    FeatureToggle.prototype.componentDidMount = () => null;
});

function setToggleTo(value: boolean | undefined) {
    testStore.dispatch({ type: featureToggleActionNames.FINISHED, data: { [toggleId]: value } });
}

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    setToggleTo(true);

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er på');
});

test('viser innhold i IfFeatureToggleOff dersom feature-toggle er av', () => {
    setToggleTo(false);

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    setToggleTo(undefined);

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.contains(<LazySpinner type="S" delay={1000} />)).toBe(true);
});
