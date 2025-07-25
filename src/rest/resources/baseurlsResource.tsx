import { type UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import AlertStripe from 'nav-frontend-alertstriper';
import { type FetchError, get } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { BaseUrls } from '../../models/baseurls';
import { type DefaultConfig, type RendererOrConfig, applyDefaults, useRest } from '../useRest';

const queryKey = ['baseurls'];
const url = `${apiBaseUri}/baseurls`;
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
