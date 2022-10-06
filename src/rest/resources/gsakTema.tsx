import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { GsakTema } from '../../models/meldinger/oppgave';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';

const url = `${apiBaseUri}/dialogoppgave/v2/tema`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

const resource = {
    useRenderer: (renderer: RendererOrConfig<GsakTema[]>) => useRest(url, applyDefaults(defaults, renderer)),
    useFetch: () => useFetch(url)
};

export default resource;
