import { applyDefaults, DefaultConfig, RendererOrConfig, useRest, useFetch } from '../useRest';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FetchResult } from '@nutgaard/use-fetch';
import { ForeldrepengerResponse } from '../../models/ytelse/foreldrepenger';

function url(fnr: string): string {
    return `${apiBaseUri}/ytelse/foreldrepenger/${fnr}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn foreldrepenger</AlertStripe>
};

const resource = {
    useFetch(): FetchResult<ForeldrepengerResponse> {
        const fnr = useFodselsnummer();
        return useFetch(url(fnr));
    },
    useRenderer(renderer: RendererOrConfig<ForeldrepengerResponse>) {
        const fnr = useFodselsnummer();
        return useRest(url(fnr), applyDefaults(defaults, renderer));
    }
};
export default resource;
