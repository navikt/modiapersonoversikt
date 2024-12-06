import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { SakstemaSoknadsstatusResponse } from '../../models/saksoversikt/sakstema';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { useAtomValue } from 'jotai';
import { aktivBrukerAtom, aktivEnhetAtom } from 'src/lib/state/context';

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

function queryKeyV2(fnr: string | undefined, enhet: string | undefined) {
    return ['sakstemaV2', fnr, enhet];
}

function urlUtenFnrIPathV2(enhet?: string) {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/v2/saker/v2/sakstema${header}`;
}

const resource = {
    useFetch(): UseQueryResult<SakstemaSoknadsstatusResponse, FetchError> {
        const fnr = useAtomValue(aktivBrukerAtom);
        const enhet = useAtomValue(aktivEnhetAtom);

        return useQuery({
            queryKey: queryKeyV2(fnr, enhet),
            queryFn: () => post(urlUtenFnrIPathV2(enhet), { fnr })
        });
    },
    useRenderer(renderer: RendererOrConfig<SakstemaSoknadsstatusResponse>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
