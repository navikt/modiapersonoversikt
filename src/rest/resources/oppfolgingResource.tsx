import { applyDefaults, DefaultConfig, RendererOrConfig, useRQRest } from '../useRest';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { VisOppfolgingFraTilDato } from '../../redux/oppfolging/types';
import { useAppState } from '../../utils/customHooks';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { FetchError, get } from '../../api/api';
import { UseMutationResult } from '@tanstack/react-query/src/types';

function queryKey(fnr: string): [string, string] {
    return ['oppfolging', fnr];
}
function url(fnr: string, periode: VisOppfolgingFraTilDato): string {
    const queryParams = `?startDato=${periode.fra}&sluttDato=${periode.til}`;
    return `${apiBaseUri}/oppfolging/${fnr}/ytelserogkontrakter${queryParams}`;
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
        return useQuery(queryKey(fnr), () => get(url(fnr, periode)));
    },
    useMutation(): UseMutationResult<DetaljertOppfolging, FetchError, void> {
        const queryClient = useQueryClient();
        const [fnr, periode] = useReduxData();
        return useMutation(() => get(url(fnr, periode)), {
            onSuccess(data: DetaljertOppfolging) {
                queryClient.setQueryData(queryKey(fnr), data);
            }
        });
    },
    useRenderer(renderer: RendererOrConfig<DetaljertOppfolging>) {
        const response = this.useFetch();
        return useRQRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
