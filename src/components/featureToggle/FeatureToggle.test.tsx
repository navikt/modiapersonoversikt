import { render } from '@testing-library/react';
import featuretogglesResource, { type FeatureTogglesResponse } from '../../rest/resources/featuretogglesResource';
import TestProvider from '../../test/Testprovider';
import { getTestStore, mockReactQuery, setupReactQueryMocks } from '../../test/testStore';
import IfFeatureToggleOff from './IfFeatureToggleOff';
import IfFeatureToggleOn from './IfFeatureToggleOn';
import type { FeatureToggles } from './toggleIDs';

const toggleId = 'toggleId' as FeatureToggles;
const testStore = getTestStore();

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    setupReactQueryMocks();
    mockReactQuery(featuretogglesResource.useFetch, {
        [toggleId]: true
    } as FeatureTogglesResponse);

    const { container } = render(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(container).toHaveTextContent('Jeg er på');
});

test('viser innhold i IfFeatureToggleOff dersom feature-toggle er av', () => {
    setupReactQueryMocks();
    mockReactQuery(featuretogglesResource.useFetch, {
        [toggleId]: false
    } as FeatureTogglesResponse);

    const { container } = render(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(container).toHaveTextContent('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    setupReactQueryMocks();
    mockReactQuery(featuretogglesResource.useFetch, { [toggleId]: false } as FeatureTogglesResponse, {
        isLoading: true
    });

    const { container, rerender } = render(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    rerender(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(container).toMatchSnapshot();
});
