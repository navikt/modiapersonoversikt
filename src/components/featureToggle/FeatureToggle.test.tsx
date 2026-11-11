import { act } from '@testing-library/react';
import { vi } from 'vitest';
import featuretogglesResource, { type FeatureTogglesResponse } from '../../rest/resources/featuretogglesResource';
import { mockReactQuery } from '../../test/mockReactQuery';
import { renderWithProviders } from '../../test/Testprovider';
import IfFeatureToggleOff from './IfFeatureToggleOff';
import IfFeatureToggleOn from './IfFeatureToggleOn';
import type { FeatureToggles } from './toggleIDs';

const toggleId = 'toggleId' as FeatureToggles;

test('viser innhold i FeatureToggle dersom feature-toggle er på', async () => {
    vi.spyOn(featuretogglesResource, 'useFetch');
    mockReactQuery(featuretogglesResource.useFetch, {
        [toggleId]: true
    } as FeatureTogglesResponse);

    const { container } = await act(() =>
        renderWithProviders(
            <>
                <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
                <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
            </>
        )
    );

    expect(container).toHaveTextContent('Jeg er på');
});

test('viser innhold i IfFeatureToggleOff dersom feature-toggle er av', async () => {
    vi.spyOn(featuretogglesResource, 'useFetch');
    mockReactQuery(featuretogglesResource.useFetch, {
        [toggleId]: false
    } as FeatureTogglesResponse);

    const { container } = await act(() =>
        renderWithProviders(
            <>
                <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
                <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
            </>
        )
    );

    expect(container).toHaveTextContent('Jeg er av');
});

test('viser LazySpinner dersom feature-toggle ikke er satt', async () => {
    vi.spyOn(featuretogglesResource, 'useFetch');
    mockReactQuery(featuretogglesResource.useFetch, { [toggleId]: false } as FeatureTogglesResponse, {
        isLoading: true
    });

    const { container, rerender } = await act(() =>
        renderWithProviders(
            <>
                <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
                <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
            </>
        )
    );

    rerender(
        <>
            <IfFeatureToggleOn toggleID={toggleId}>Jeg er på</IfFeatureToggleOn>
            <IfFeatureToggleOff toggleID={toggleId}>Jeg er av</IfFeatureToggleOff>
        </>
    );

    expect(container).toMatchSnapshot();
});
