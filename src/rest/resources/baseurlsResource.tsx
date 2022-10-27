import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { BaseUrl, BaseUrlsResponse } from '../../models/baseurls';
import { loggError } from '../../utils/logger/frontendLogger';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

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

const queryKey = ['baseurls'];
const url = `${apiBaseUri}/baseurls`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn baseurls</AlertStripe>
};

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        queryClient.prefetchQuery(queryKey, () => get(url));
    },
    useFetch(): UseQueryResult<BaseUrlsResponse, FetchError> {
        return useQuery(queryKey, () => get(url));
    },
    useRenderer(renderer: RendererOrConfig<BaseUrlsResponse>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;