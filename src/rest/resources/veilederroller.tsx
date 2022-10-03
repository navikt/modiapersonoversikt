import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { VeilederRoller } from '../../models/veilederRoller';

const url = `${apiBaseUri}/veileder/roller`;
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn veileders roller</AlertStripe>
};

const resource = {
    useRenderer: (renderer: RendererOrConfig<VeilederRoller>) => useRest(url, applyDefaults(defaults, renderer)),
    useFetch: () => useFetch(url)
};

export default resource;
