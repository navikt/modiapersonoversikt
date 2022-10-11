import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';

/**
 * Kan denne kanskje erstattes av kall til modiacontextholder, og bør den evt gjøre det?
 */
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
    useRenderer: (renderer: RendererOrConfig<SaksbehandlersEnheter>) => useRest(url, applyDefaults(defaults, renderer)),
    useFetch: () => useFetch<SaksbehandlersEnheter>(url)
};

export default resource;
