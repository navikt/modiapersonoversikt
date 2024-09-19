import { TiltakspengerResource } from '../../models/ytelse/tiltakspenger';
import { apiBaseUri } from '../../api/config';
import { useAppState } from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import dayjs from 'dayjs';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import {
    getFraDateFromFilter,
    getFraDateFromPeriod,
    getTilDateFromFilter
} from '../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils';
import { PeriodeValg } from '../../redux/utbetalinger/types';

interface Periode<T> {
    fra: T;
    til: T;
}

function queryKey(fnr: string, fom?: string, tom?: string) {
    return ['tiltakspenger', fnr, fom, tom];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/tiltakspenger`;
}
export function useReduxData(): [string, Periode<string>] {
    const filterPeriode = useAppState((appState) => appState.ytelser.periode);
    const periode = filterPeriode
        ? {
              fra: getFraDateFromFilter(filterPeriode),
              til: getTilDateFromFilter(filterPeriode)
          }
        : getFraDateFromPeriod(PeriodeValg.EGENDEFINERT);
    const datoer: Periode<string> = {
        fra: dayjs(periode.fra).format('YYYY-MM-DD'),
        til: dayjs(periode.til).format('YYYY-MM-DD')
    };
    return useAppState((appState) => [appState.gjeldendeBruker.fødselsnummer, datoer]);
}

const resource = {
    useFetch(): UseQueryResult<TiltakspengerResource, FetchError> {
        const [fnr, periode] = useReduxData();
        const tiltakspengerFeatureToggle = useFeatureToggle(FeatureToggles.BrukNyTiltakspenger);

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: (): Promise<TiltakspengerResource> =>
                tiltakspengerFeatureToggle.isOn
                    ? post(urlV2(), {
                          fnr,
                          fom: periode.fra,
                          tom: periode.til
                      })
                    : Promise.resolve([]),
            enabled: !tiltakspengerFeatureToggle.pending
        });
    }
};
export default resource;
