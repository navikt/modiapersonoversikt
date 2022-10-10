import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { VisOppfolgingFraTilDato } from '../../redux/oppfolging/types';
import { useAppState } from '../../utils/customHooks';

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
const lazyConfig = { lazy: true };
const resource = {
    useRenderer(renderer: RendererOrConfig<DetaljertOppfolging>) {
        const [fnr, periode] = useReduxData();
        return useRest(url(fnr, periode), applyDefaults(defaults, renderer));
    },
    useLazyFetch() {
        const [fnr, periode] = useReduxData();
        return useFetch<DetaljertOppfolging>(url(fnr, periode), lazyConfig);
    }
};

export default resource;
