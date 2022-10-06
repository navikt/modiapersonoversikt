import * as React from 'react';
import { mount } from 'enzyme';
import IfFeatureToggleOff from './IfFeatureToggleOff';
import LazySpinner from '../LazySpinner';
import IfFeatureToggleOn from './IfFeatureToggleOn';
import TestProvider from '../../test/Testprovider';
import { getTestStore } from '../../test/testStore';
import { FeatureToggles } from './toggleIDs';
import { cache } from '@nutgaard/use-fetch';

const toggleId = 'toggleId' as FeatureToggles;
const testStore = getTestStore();

test('viser innhold i FeatureToggle dersom feature-toggle er på', () => {
    cache.putResolved('featuretoggles', { [toggleId]: true });

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er på');
});

test('viser innhold i IfFeatureToggleOff dersom feature-toggle er av', () => {
    cache.putResolved('featuretoggles', { [toggleId]: false });

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.text()).toContain('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', () => {
    cache.remove('featuretoggles');

    const result = mount(
        <TestProvider customStore={testStore}>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </TestProvider>
    );

    expect(result.contains(<LazySpinner type="S" delay={1000} />)).toBe(true);
});
