import * as React from 'react';
import { mount } from 'enzyme';
import IfFeatureToggleOff from './IfFeatureToggleOff';
import LazySpinner from '../LazySpinner';
import IfFeatureToggleOn from './IfFeatureToggleOn';
import TestProvider from '../../test/Testprovider';
import { getTestStore, mockReactQuery, setupReactQueryMocks } from '../../test/testStore';
import { FeatureToggles } from './toggleIDs';
import featuretogglesResource from '../../rest/resources/featuretogglesResource';

const toggleId = 'toggleId' as FeatureToggles;
const testStore = getTestStore();

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    setupReactQueryMocks();
    mockReactQuery(featuretogglesResource.useFetch, { [toggleId]: true });

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er på');
});

test('viser innhold i IfFeatureToggleOff dersom feature-toggle er av', () => {
    setupReactQueryMocks();
    mockReactQuery(featuretogglesResource.useFetch, { [toggleId]: false });

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    setupReactQueryMocks();
    mockReactQuery(featuretogglesResource.useFetch, { [toggleId]: false }, { isLoading: true });

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.contains(<LazySpinner type="S" delay={1000} />)).toBe(true);
});
