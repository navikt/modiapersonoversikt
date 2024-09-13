import { TiltakspengerResource } from '../../models/ytelse/tiltakspenger';
import { apiBaseUri } from '../../api/config';
import {useAppState, useFodselsnummer} from '../../utils/customHooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FetchError, post } from '../../api/api';
import dayjs from 'dayjs';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';
import {
    getFraDateFromFilter, getTilDateFromFilter,
    getUtbetalingerForSiste30DagerDatoer
} from "../../app/personside/infotabs/utbetalinger/utils/utbetalinger-utils";

interface Periode<T> {
    fra: T;
    til: T;
}

function queryKey(fnr: string): [string, string] {
    return ['tiltakspenger', fnr];
}

function urlV2(): string {
    return `${apiBaseUri}/v2/ytelse/tiltakspenger`;
}
export function useReduxData(limit30Dager: boolean): [string, Periode<string>] {
    const filterPeriode = useAppState((appState) => appState.ytelser.periode);
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
    useFetch(limit30Dager: boolean = false): UseQueryResult<TiltakspengerResource, FetchError> {
        const [fnr, periode] = useReduxData(limit30Dager);
        const tiltakspengerFeatureToggle = useFeatureToggle(FeatureToggles.BrukNyTiltakspenger);

        return useQuery({
            queryKey: queryKey(fnr),
            queryFn: () =>
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
