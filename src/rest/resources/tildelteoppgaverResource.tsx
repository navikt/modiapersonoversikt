import { useFodselsnummer } from '../../utils/customHooks';
import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { Oppgave } from '../../models/meldinger/oppgave';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string): [string, string] {
    return ['tildelteoppgaver', fnr];
}
function url(fnr: string): string {
    return `${apiBaseUri}/oppgaver/tildelt/${fnr}`;
}

function urlUtenFnrIPath(): string {
    return `${apiBaseUri}/oppgaver/tildelt`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn oppgaver</AlertStripe>
};

const resource = {
    useFetch(): UseQueryResult<Oppgave[], FetchError> {
        const fnr = useFodselsnummer();
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);

        return useQuery(queryKey(fnr), () => (isOn ? post(urlUtenFnrIPath(), { fnr }) : get(url(fnr))));
    },
    useRenderer(renderer: RendererOrConfig<Oppgave[]>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};
export default resource;
