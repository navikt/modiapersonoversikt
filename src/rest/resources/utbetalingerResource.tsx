import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { getUtbetalingerForSiste30DagerDatoer } from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import dayjs from 'dayjs';
import { UtbetalingerResponse } from '../../models/utbetalinger';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';

function urlV2(fom: string, tom: string): string {
    return `${apiBaseUri}/v2/utbetaling?startDato=${fom}&sluttDato=${tom}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers utbetalinger</AlertStripe>
};

const resource = {
    useFetch(fom: string, tom: string): UseQueryResult<UtbetalingerResponse, FetchError> {
        const fnr = useFodselsnummer();
        return useQuery({
            queryKey: ['utbetalinger', fnr, fom, tom],
            queryFn: () => post(urlV2(fom, tom), { fnr })
        });
    },
    useOversiktRenderer(renderer: RendererOrConfig<UtbetalingerResponse>) {
        const periode = getUtbetalingerForSiste30DagerDatoer();
        const datoer = {
            fra: dayjs(periode.fra).format('YYYY-MM-DD'),
            til: dayjs(periode.til).format('YYYY-MM-DD')
        };
        const response = this.useFetch(datoer.fra, datoer.til);
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
