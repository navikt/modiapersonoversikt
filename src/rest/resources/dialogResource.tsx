import { applyDefaults, DefaultConfig, RendererOrConfig, useRQRest } from '../useRest';
import { apiBaseUri } from '../../api/config';
import { useAppState } from '../../utils/customHooks';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { Traad } from '../../models/meldinger/meldinger';
import { useValgtenhet } from '../../context/valgtenhet-state';
import { get } from '../../api/api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

function url(fnr: string, enhet: string | undefined): string {
    const header = enhet ? `?enhet=${enhet}` : '';
    return `${apiBaseUri}/dialog/${fnr}/meldinger${header}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn brukers meldinger</AlertStripe>
};

function useReduxData(): [string, string | undefined] {
    const valgtEnhet = useValgtenhet().enhetId;
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, valgtEnhet]);
}

function fetchDialog(fnr: string, enhet: string | undefined): Promise<Traad[]> {
    return get<Traad[]>(url(fnr, enhet));
}

const resource = {
    queryKey(fnr: string, enhet: string | undefined) {
        return ['dialog', fnr, enhet];
    },
    useFetch(): UseQueryResult<Traad[], Error> {
        const [fnr, enhetId] = useReduxData();
        return useQuery(this.queryKey(fnr, enhetId), () => fetchDialog(fnr, enhetId));
    },
    useRenderer(renderer: RendererOrConfig<Traad[]>) {
        const response = this.useFetch();
        return useRQRest(response, applyDefaults(defaults, renderer));
    }
};
export default resource;
