import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRQRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { get } from '../../api/api';

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
    useFetch(): UseQueryResult<FeatureTogglesResponse, Error> {
        return useQuery(queryKey, () => get(url()));
    },
    useRenderer(renderer: RendererOrConfig<FeatureTogglesResponse>) {
        const response = this.useFetch();
        return useRQRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
