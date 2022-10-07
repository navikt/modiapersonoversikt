import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';

/**
 * Kan denne kanskje erstattes av kall til modiacontextholder, og bør den evt gjøre det?
 */
const url = `${apiBaseUri}/hode/me`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om innlogget bruker</AlertStripe>
};

export interface InnloggetSaksbehandler {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

const resource = {
    useRenderer: (renderer: RendererOrConfig<InnloggetSaksbehandler>) =>
        useRest(url, applyDefaults(defaults, renderer)),
    useFetch: () => useFetch<InnloggetSaksbehandler>(url)
};

export default resource;
