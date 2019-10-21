import moment from 'moment';
import { usePaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { useParams } from 'react-router';
import { Traad } from '../../../models/meldinger/meldinger';
import { Sakstema } from '../../../models/saksoversikt/sakstema';
import { getUnikSakstemaKey } from './saksoversikt/utils/saksoversiktUtils';
import { useMemo } from 'react';

type DyplenkeParams = { posteringsdato?: string; traadId?: string; sakstemakey?: string; unikId?: string };
export type UnikYtelseKey = string;

export function useInfotabsDyplenker() {
    const params = useParams<DyplenkeParams>();
    const paths = usePaths();
    return useMemo(
        () => ({
            utbetaling: {
                link: (utbetaling: Utbetaling) => `${paths.utbetlainger}/${moment(utbetaling.posteringsdato).unix()}`,
                route: `${paths.utbetlainger}/:posteringsdato?`,
                erValgt: (utbetaling: Utbetaling) => {
                    const posteringsdatoFraUrl = moment.unix((params.posteringsdato as unknown) as number);
                    return moment(utbetaling.posteringsdato).isSame(posteringsdatoFraUrl);
                }
            },
            meldinger: {
                link: (traad: Traad) => `${paths.meldinger}/${traad.traadId}`,
                route: `${paths.meldinger}/:traadId?`,
                erValgt: (traad: Traad) => traad.traadId === params.traadId
            },
            saker: {
                link: (saksTema: Sakstema) => `${paths.saker}/${getUnikSakstemaKey(saksTema)}`,
                route: `${paths.saker}/:sakstemakey?`,
                erValgt: (sakstema: Sakstema) => getUnikSakstemaKey(sakstema) === params.sakstemakey
            },
            ytelser: {
                link: (unikId: string) => `${paths.ytelser}/${unikId}`,
                route: `${paths.ytelser}/:unikId?`,
                erValgt: (unikId: UnikYtelseKey) => unikId === params.unikId
            }
        }),
        [paths, params]
    );
}
