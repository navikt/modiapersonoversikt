import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { BaseUrls } from '../../models/baseurls';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

const queryKey = ['baseurls'];
const url = `${apiBaseUri}/baseurls/v2`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn baseurls</AlertStripe>
};

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        return queryClient.prefetchQuery({ queryKey, queryFn: () => get(url) });
    },
    useFetch(): UseQueryResult<BaseUrls, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url)
        });
    },
    useRenderer(renderer: RendererOrConfig<BaseUrls>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
