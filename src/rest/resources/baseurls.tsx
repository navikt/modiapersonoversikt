import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { BaseUrl, BaseUrlsResponse } from '../../models/baseurls';
import { loggError } from '../../utils/logger/frontendLogger';

export function hentBaseUrl(baseUrlsResponse: BaseUrlsResponse, key: string) {
    const resultUrl = baseUrlsResponse.baseUrls.find((baseUrl: BaseUrl) => {
        return baseUrl.key === key;
    });
    if (!resultUrl) {
        loggError(new Error('Kunne ikke finne base-url for: ' + key), undefined, {
            baseurls: baseUrlsResponse.baseUrls
        });
        return '';
    }
    return resultUrl.url;
}

const url = `${apiBaseUri}/baseurls`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn baseurls</AlertStripe>
};

const resource = {
    useRenderer: (renderer: RendererOrConfig<BaseUrlsResponse>) => useRest(url, applyDefaults(defaults, renderer)),
    usePreload: () => useFetch<BaseUrlsResponse>(url)
};

export default resource;
