import { applyDefaults, DefaultConfig, RendererOrConfig, useRest, useFetch } from '../useRest';
import { apiBaseUri } from '../../api/config';
import { useAppState } from '../../utils/customHooks';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FetchResult } from '@nutgaard/use-fetch';
import { Traad } from '../../models/meldinger/meldinger';

function url(fnr: string, enhet: string | undefined): string {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/dialog/${fnr}/meldinger${header}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn brukers meldinger</AlertStripe>
};

function useReduxData(): [string, string | undefined] {
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, appState.session.valgtEnhetId]);
}

const resource = {
    useFetch(): FetchResult<Traad[]> {
        const [fnr, enhetId] = useReduxData();
        return useFetch(url(fnr, enhetId));
    },
    useRenderer(renderer: RendererOrConfig<Traad[]>) {
        const [fnr, enhetId] = useReduxData();
        return useRest(url(fnr, enhetId), applyDefaults(defaults, renderer));
    }
};
export default resource;
