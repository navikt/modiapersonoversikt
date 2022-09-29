import { FetchResult } from '@nutgaard/use-fetch';
import { useFodselsnummer } from '../../utils/customHooks';
import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { Oppgave } from '../../models/meldinger/oppgave';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';

function url(fnr: string): string {
    return `${apiBaseUri}/oppgaver/tildelt/${fnr}`;
}
const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn oppgaver</AlertStripe>
};

const resource = {
    useFetch(): FetchResult<Oppgave[]> {
        const fnr = useFodselsnummer();
        return useFetch(url(fnr));
    },
    useRenderer(renderer: RendererOrConfig<Oppgave[]>) {
        const fnr = useFodselsnummer();
        return useRest(url(fnr), applyDefaults(defaults, renderer));
    }
};
export default resource;
