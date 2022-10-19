import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

export type FeatureTogglesResponse = {
    [key in FeatureToggles]: boolean;
};

export const queryKey = ['featuretoggles'];
function url(): string {
    const queryParams = Object.values(FeatureToggles)
        .map((it) => `id=${it}`)
        .join('&');

    return `${apiBaseUri}/featuretoggle/?${queryParams}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn feature toggles</AlertStripe>
};

const resource = {
    useFetch(): UseQueryResult<FeatureTogglesResponse, FetchError> {
        return useQuery(queryKey, () => get(url()));
    },
    useRenderer(renderer: RendererOrConfig<FeatureTogglesResponse>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
