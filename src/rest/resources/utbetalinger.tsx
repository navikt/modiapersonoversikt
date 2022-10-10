import { applyDefaults, DefaultConfig, RendererOrConfig, useFetch, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { useAppState } from '../../utils/customHooks';
import {
    getFraDateFromFilter,
    getTilDateFromFilter,
    getUtbetalingerForSiste30DagerDatoer
} from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import dayjs from 'dayjs';
import { UtbetalingerResponse } from '../../models/utbetalinger';

interface Periode<T> {
    fra: T;
    til: T;
}
function url(fnr: string, periode: Periode<string>): string {
    return `${apiBaseUri}/utbetaling/${fnr}?startDato=${periode.fra}&sluttDato=${periode.til}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
};

function useReduxData(brukPeriodeFraFilter: boolean): [string, Periode<string>] {
    const filterPeriode = useAppState((appState) => appState.utbetalinger.filter);
    const periode = brukPeriodeFraFilter
        ? {
              fra: getFraDateFromFilter(filterPeriode),
              til: getTilDateFromFilter(filterPeriode)
          }
        : getUtbetalingerForSiste30DagerDatoer();
    const datoer: Periode<string> = {
        fra: dayjs(periode.fra).format('YYYY-MM-DD'),
        til: dayjs(periode.til).format('YYYY-MM-DD')
    };
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, datoer]);
}

const lazyConfig = { lazy: true };
const resource = {
    useOversiktRenderer(renderer: RendererOrConfig<UtbetalingerResponse>) {
        const [fnr, periode] = useReduxData(false);
        return useRest(url(fnr, periode), applyDefaults(defaults, renderer));
    },
    useLazyFetch() {
        const [fnr, periode] = useReduxData(true);
        return useFetch<UtbetalingerResponse>(url(fnr, periode), lazyConfig);
    }
};

export default resource;
