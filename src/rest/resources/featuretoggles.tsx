import * as React from 'react';
import { Config as HookConfig } from '@nutgaard/use-fetch';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

export type FeatureTogglesResponse = {
    [key in FeatureToggles]: boolean;
};

function url(): string {
    const queryParams = Object.keys(FeatureToggles)
        .map((it) => `id=${it}`)
        .join('&');

    return `${apiBaseUri}/featuretoggle/?${queryParams}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn feature toggles</AlertStripe>
};
const hookConfig: HookConfig = {
    lazy: false,
    cacheKey: 'featuretoggles'
};

const resource = {
    useRenderer: (renderer: RendererOrConfig<FeatureTogglesResponse>) =>
        useRest(url(), applyDefaults(defaults, renderer), hookConfig),
    useFetch: () => useFetch(url(), hookConfig)
};

export default resource;
