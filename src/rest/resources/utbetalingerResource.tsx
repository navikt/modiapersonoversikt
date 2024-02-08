import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
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
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

interface Periode<T> {
    fra: T;
    til: T;
}
function queryKey(fnr: string, oversikt: boolean) {
    return ['utbetalinger', fnr, oversikt];
}

function urlV2(periode: Periode<string>): string {
    return `${apiBaseUri}/v2/utbetaling?startDato=${periode.fra}&sluttDato=${periode.til}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
};

function useReduxData(limit30Dager: boolean): [string, Periode<string>] {
    const filterPeriode = useAppState((appState) => appState.utbetalinger.filter);
    const periode = limit30Dager
        ? getUtbetalingerForSiste30DagerDatoer()
        : {
              fra: getFraDateFromFilter(filterPeriode),
              til: getTilDateFromFilter(filterPeriode)
          };
    const datoer: Periode<string> = {
        fra: dayjs(periode.fra).format('YYYY-MM-DD'),
        til: dayjs(periode.til).format('YYYY-MM-DD')
    };
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, datoer]);
}

const resource = {
    useFetch(limit30Dager: boolean = false): UseQueryResult<UtbetalingerResponse, FetchError> {
        const [fnr, periode] = useReduxData(limit30Dager);

        return useQuery(queryKey(fnr, limit30Dager), () => post(urlV2(periode), { fnr }));
    },
    useOversiktRenderer(renderer: RendererOrConfig<UtbetalingerResponse>) {
        const response = this.useFetch(true);
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
