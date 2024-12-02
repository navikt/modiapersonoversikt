import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { SakstemaSoknadsstatusResponse } from '../../models/saksoversikt/sakstema';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { useValgtenhet } from '../../context/valgtenhet-state';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

function queryKeyV2(fnr: string, enhet: string | undefined): [string, string, string | undefined] {
    return ['sakstemaV2', fnr, enhet];
}

function urlUtenFnrIPathV2(enhet?: string) {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/v2/saker/v2/sakstema${header}`;
}

function useFnrEnhet(): [string, string | undefined] {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const enhet = useValgtenhet().enhetId;
    return [fnr, enhet];
}

const resource = {
    useFetch(): UseQueryResult<SakstemaSoknadsstatusResponse, FetchError> {
        const [fnr, enhet] = useFnrEnhet();

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
