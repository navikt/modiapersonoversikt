import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { VisOppfolgingFraTilDato } from '../../redux/oppfolging/types';
import { useAppState } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get, post } from '../../api/api';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

function queryKey(fnr: string): [string, string] {
    return ['oppfolging', fnr];
}
function url(fnr: string, periode: VisOppfolgingFraTilDato): string {
    const queryParams = `?startDato=${periode.fra}&sluttDato=${periode.til}`;
    return `${apiBaseUri}/oppfolging/${fnr}/ytelserogkontrakter${queryParams}`;
}

function urlUtenFnrIPath(periode: VisOppfolgingFraTilDato): string {
    const queryParams = `?startDato=${periode.fra}&sluttDato=${periode.til}`;
    return `${apiBaseUri}/oppfolging/ytelserogkontrakter${queryParams}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
};

function useReduxData(): [string, VisOppfolgingFraTilDato] {
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, appState.oppfolging.valgtPeriode]);
}

const resource = {
    useFetch(): UseQueryResult<DetaljertOppfolging, FetchError> {
        const [fnr, periode] = useReduxData();
        const { isOn } = useFeatureToggle(FeatureToggles.IkkeFnrIPath);
        return useQuery(queryKey(fnr), () => (isOn ? post(urlUtenFnrIPath(periode), fnr) : get(url(fnr, periode))));
    },
    useRenderer(renderer: RendererOrConfig<DetaljertOppfolging>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
