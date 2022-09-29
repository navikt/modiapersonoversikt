import { applyDefaults, DefaultConfig, RendererOrConfig, useRest, useFetch } from '../useRest';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FetchResult } from '@nutgaard/use-fetch';
import { PleiepengerResponse } from '../../models/ytelse/pleiepenger';

function url(fnr: string): string {
    return `${apiBaseUri}/ytelse/pleiepenger/${fnr}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn sykepenger</AlertStripe>
};

const resource = {
    useFetch(): FetchResult<PleiepengerResponse> {
        const fnr = useFodselsnummer();
        return useFetch(url(fnr));
    },
    useRenderer(renderer: RendererOrConfig<PleiepengerResponse>) {
        const fnr = useFodselsnummer();
        return useRest(url(fnr), applyDefaults(defaults, renderer));
    }
};
export default resource;
