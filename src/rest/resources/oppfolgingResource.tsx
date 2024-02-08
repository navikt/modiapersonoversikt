import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { VisOppfolgingFraTilDato } from '../../redux/oppfolging/types';
import { useAppState } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

function queryKey(fnr: string): [string, string] {
    return ['oppfolging', fnr];
}

function urlUtenFnrIPath(periode: VisOppfolgingFraTilDato): string {
    const queryParams = `?startDato=${periode.fra}&sluttDato=${periode.til}`;
    return `${apiBaseUri}/v2/oppfolging/ytelserogkontrakter${queryParams}`;
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
        return useQuery(queryKey(fnr), () => post(urlUtenFnrIPath(periode), { fnr }));
    },
    useRenderer(renderer: RendererOrConfig<DetaljertOppfolging>) {
        const response = this.useFetch();
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
