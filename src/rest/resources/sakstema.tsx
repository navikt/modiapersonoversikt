import * as React from 'react';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest, useFetch } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { FetchResult } from '@nutgaard/use-fetch';
import { SakstemaResponse } from '../../models/saksoversikt/sakstema';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

function url(fnr: string, enhet: string | undefined) {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/saker/${fnr}/sakstema${header}`;
}

function useFnrEnhet(): [string, string | undefined] {
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const enhet = useSelector((state: AppState) => state.session.valgtEnhetId);
    return [fnr, enhet];
}

const resource = {
    useFetch(): FetchResult<SakstemaResponse> {
        const [fnr, enhet] = useFnrEnhet();
        return useFetch(url(fnr, enhet));
    },
    useRenderer(renderer: RendererOrConfig<SakstemaResponse>) {
        const [fnr, enhet] = useFnrEnhet();
        return useRest(url(fnr, enhet), applyDefaults(defaults, renderer));
    }
};

export default resource;
