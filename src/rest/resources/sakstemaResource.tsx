import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import AlertStripe from 'nav-frontend-alertstriper';
import { aktivBrukerAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { SakstemaSoknadsstatusResponse } from '../../models/saksoversikt/sakstema';
import { type DefaultConfig, type RendererOrConfig, applyDefaults, useRest } from '../useRest';

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

function queryKey(fnr: string | undefined, enhet: string | undefined) {
    return ['sakstema', fnr, enhet];
}

function url(enhet?: string) {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/saker/sakstema${header}`;
}

const resource = {
    useFetch(): UseQueryResult<SakstemaSoknadsstatusResponse, FetchError> {
        const fnr = useAtomValue(aktivBrukerAtom);
        const enhet = useAtomValue(aktivEnhetAtom);

        return useQuery({
            queryKey: queryKey(fnr, enhet),
            queryFn: () => post(url(enhet), { fnr })
        });
    },
    useRenderer(renderer: RendererOrConfig<SakstemaSoknadsstatusResponse>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
