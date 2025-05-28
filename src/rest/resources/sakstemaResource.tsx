import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import AlertStripe from 'nav-frontend-alertstriper';
import { aktivBrukerAtom, aktivEnhetAtom } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { SakstemaResponse } from '../../models/saksoversikt/sakstema';
import { type DefaultConfig, type RendererOrConfig, applyDefaults, useRest } from '../useRest';

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
    useFetch(): UseQueryResult<SakstemaResponse, FetchError> {
        const fnr = useAtomValue(aktivBrukerAtom);
        const enhet = useAtomValue(aktivEnhetAtom);

        return useQuery({
            queryKey: queryKeyV2(fnr, enhet),
            queryFn: () => post(urlUtenFnrIPathV2(enhet), { fnr })
        });
    },
    useRenderer(renderer: RendererOrConfig<SakstemaResponse>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
