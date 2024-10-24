import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { GsakTema } from '../../models/meldinger/oppgave';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

const queryKey = ['gsaktema'];
const url = `${apiBaseUri}/dialogoppgave/v2/tema`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        return queryClient.prefetchQuery({ queryKey, queryFn: () => get(url) });
    },
    useFetch(): UseQueryResult<GsakTema[], FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url)
        });
    },
    useRenderer(renderer: RendererOrConfig<GsakTema[]>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
