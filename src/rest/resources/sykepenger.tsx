import { applyDefaults, DefaultConfig, RendererOrConfig, useRest, useFetch } from '../useRest';
import { SykepengerResponse } from '../../models/ytelse/sykepenger';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FetchResult } from '@nutgaard/use-fetch';

function url(fnr: string): string {
    return `${apiBaseUri}/ytelse/sykepenger/${fnr}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn sykepenger</AlertStripe>
};

const resource = {
    useFetch(): FetchResult<SykepengerResponse> {
        const fnr = useFodselsnummer();
        return useFetch(url(fnr));
    },
    useRenderer(renderer: RendererOrConfig<SykepengerResponse>) {
        const fnr = useFodselsnummer();
        return useRest(url(fnr), applyDefaults(defaults, renderer));
    }
};
export default resource;
