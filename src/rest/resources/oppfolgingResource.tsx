import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import AlertStripe from 'nav-frontend-alertstriper';
import { usePersonAtomValue } from 'src/lib/state/context';
import { type FetchError, post } from '../../api/api';
import { apiBaseUri } from '../../api/config';
import { getUtbetalingerForSiste30DagerDatoer } from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import type { DetaljertOppfolging } from '../../models/oppfolging';
import { type DefaultConfig, type RendererOrConfig, applyDefaults, useRest } from '../useRest';

const defaults: DefaultConfig = {
    ifPending: <CenteredLazySpinner />,
    ifError: <AlertStripe type="advarsel">Kunne ikke laste inn informasjon om brukers oppfølging</AlertStripe>
};

const resource = {
    useFetch(fom: string, tom: string): UseQueryResult<DetaljertOppfolging, FetchError> {
        const fnr = usePersonAtomValue();
        const queryParams = `?startDato=${fom}&sluttDato=${tom}`;
        return useQuery({
            queryKey: ['oppfolging', fnr, fom, tom],
            queryFn: () => post(`${apiBaseUri}/oppfolging/ytelserogkontrakter${queryParams}`, { fnr })
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
