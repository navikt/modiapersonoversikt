import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { GsakTema } from '../../models/meldinger/oppgave';
import { applyDefaults, DefaultConfig, RendererOrConfig, usePreload, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';

const url = `${apiBaseUri}/dialogoppgave/v2/tema`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn tema</AlertStripe>
};

export default {
    useRenderer: (renderer: RendererOrConfig<GsakTema[]>) => useRest(url, applyDefaults(defaults, renderer)),
    usePreload: () => usePreload(url)
};
