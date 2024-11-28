import { applyDefaults, DefaultConfig, RendererOrConfig, useRest } from '../useRest';
import { DetaljertOppfolging } from '../../models/oppfolging';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import AlertStripe from 'nav-frontend-alertstriper';
import { apiBaseUri } from '../../api/config';
import { useFodselsnummer } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import { getUtbetalingerForSiste30DagerDatoer } from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import dayjs from 'dayjs';

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
};

const resource = {
    useFetch(fom: string, tom: string): UseQueryResult<DetaljertOppfolging, FetchError> {
        const fnr = useFodselsnummer();
        const queryParams = `?startDato=${fom}&sluttDato=${tom}`;
        return useQuery({
            queryKey: ['oppfolging', fnr, fom, tom],
            queryFn: () => post(`${apiBaseUri}/v2/oppfolging/ytelserogkontrakter${queryParams}`, { fnr })
        });
    },
    useOversiktRenderer(renderer: RendererOrConfig<DetaljertOppfolging>) {
        const periode = getUtbetalingerForSiste30DagerDatoer();
        const fom = dayjs(periode.fra).format('YYYY-MM-DD');
        const tom = dayjs(periode.til).format('YYYY-MM-DD');
        const response = this.useFetch(fom, tom);
        return useRest(response, applyDefaults(defaults, renderer));
    }
};

export default resource;
