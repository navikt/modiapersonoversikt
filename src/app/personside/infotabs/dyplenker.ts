import dayjs from 'dayjs';
import { usePaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { useParams } from 'react-router';
import { Traad } from '../../../models/meldinger/meldinger';
import { useMemo } from 'react';
import { SakerRouting, useSakerRouting } from './saksoversikt/utils/saksoversiktRoutingUtils';
import { useQueryParams } from '../../../utils/url-utils';
import { getUnikYtelseKey, Ytelse } from '../../../models/ytelse/ytelse-utils';

interface Dyplenker {
    utbetaling: {
        link: (utbetaling: Utbetaling) => string;
        route: string;
        erValgt: (utbetaling: Utbetaling) => boolean;
    };
    meldinger: {
        link: (traad: Traad) => string;
        route: string;
        erValgt: (traad: Traad) => boolean;
    };
    saker: SakerRouting;
    ytelser: {
        link: (ytelse: Ytelse) => string;
        route: string;
        erValgt: (ytelse: Ytelse) => boolean;
    };
}

type DyplenkeParams = {
    posteringsdato?: string;
};

type DyplenkerQueryParams = {
    traadId?: string;
    ytelse?: string;
};

export function useInfotabsDyplenker(): Dyplenker {
    const params = useParams<DyplenkeParams>();
    const posteringsdato: string | undefined = params.posteringsdato;

    const queryParams = useQueryParams<DyplenkerQueryParams>();
    const paths = usePaths();
    const sakerRouting = useSakerRouting();

    return useMemo(
        () => ({
            utbetaling: {
                link: (utbetaling: Utbetaling) => `${paths.utbetlainger}/${dayjs(utbetaling.posteringsdato).unix()}`,
                route: `${paths.utbetlainger}/:posteringsdato?`,
                erValgt: (utbetaling: Utbetaling) => {
                    const posteringsdatoFraUrl = dayjs.unix((posteringsdato as unknown) as number);
                    return dayjs(utbetaling.posteringsdato).isSame(posteringsdatoFraUrl);
                }
            },
            meldinger: {
                link: (traad: Traad) => `${paths.meldinger}?traadId=${traad.traadId}`,
                route: `${paths.meldinger}`,
                erValgt: (traad: Traad) => traad.traadId === queryParams.traadId
            },
            saker: sakerRouting,
            ytelser: {
                link: (ytelse: Ytelse) => `${paths.ytelser}?ytelse=${getUnikYtelseKey(ytelse)}`,
                route: `${paths.ytelser}`,
                erValgt: (ytelse: Ytelse) => getUnikYtelseKey(ytelse) === queryParams.ytelse
            }
        }),
        [paths, posteringsdato, sakerRouting, queryParams]
    );
}
