import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import AlertStripe from 'nav-frontend-alertstriper';
import { usePersonAtomValue } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { getUtbetalingerForSiste30DagerDatoer } from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { UtbetalingerResponse } from '../../models/utbetalinger';
import { type DefaultConfig, type RendererOrConfig, applyDefaults, useRest } from '../useRest';

function urlV2(fom: string, tom: string): string {
    return `${apiBaseUri}/utbetaling?startDato=${fom}&sluttDato=${tom}`;
}

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers utbetalinger</AlertStripe>
};

const resource = {
    useFetch(fom: string, tom: string): UseQueryResult<UtbetalingerResponse, FetchError> {
        const fnr = usePersonAtomValue();
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
