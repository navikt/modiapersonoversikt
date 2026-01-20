import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import AlertStripe from 'nav-frontend-alertstriper';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { useValgtenhet } from '../../context/valgtenhet-state';
import type { Traad } from '../../models/meldinger/meldinger';
import { useAppState } from '../../utils/customHooks';
import { applyDefaults, type DefaultConfig, type RendererOrConfig, useRest } from '../useRest';

function urlUtenFnrIPath(enhet?: string) {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/dialog/meldinger${header}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn brukers meldinger</AlertStripe>
};

function useReduxData(): [string, string | undefined] {
    const valgtEnhet = useValgtenhet().enhetId;
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, valgtEnhet]);
}

const resource = {
    queryKey(fnr: string, enhet: string | undefined) {
        return ['dialog', fnr, enhet];
    },
    useFetch(): UseQueryResult<Traad[], FetchError> {
        const [fnr, enhetId] = useReduxData();

        return useQuery({
            queryKey: this.queryKey(fnr, enhetId),
            queryFn: () => post(urlUtenFnrIPath(enhetId), { fnr })
        });
    },
    useRenderer(renderer: RendererOrConfig<Traad[]>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};
export default resource;
