import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';

/**
 * Kan denne kanskje erstattes av kall til modiacontextholder, og bør den evt gjøre det?
 */
const queryKey = ['saksbehandlersenheter'];
const url = `${apiBaseUri}/hode/enheter`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om innlogget brukers enheter</AlertStripe>
};

export interface Enhet {
    navn: string;
    enhetId: string;
}

export interface SaksbehandlersEnheter {
    ident: string;
    enhetliste: Enhet[];
}

const resource = {
    usePrefetch() {
        const queryClient = useQueryClient();
        return queryClient.prefetchQuery({ queryKey, queryFn: () => get(url) });
    },
    useFetch(): UseQueryResult<SaksbehandlersEnheter, FetchError> {
        return useQuery({
            queryKey: queryKey,
            queryFn: () => get(url)
        });
    },
    useRenderer(renderer: RendererOrConfig<SaksbehandlersEnheter>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
