import moment from 'moment';
import { usePaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { useParams } from 'react-router';
import { Traad } from '../../../models/meldinger/meldinger';
import { useMemo } from 'react';
import { SakerRouting, useSakerRouting } from './saksoversikt/utils/saksoversiktRoutingUtils';
import { useQueryParams } from '../../../utils/urlUtils';

export interface Dyplenker {
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
        link: (unikId: string) => string;
        route: string;
        erValgt: (unikId: UnikYtelseKey) => boolean;
        erQueryParamNull: () => boolean;
    };
}

type DyplenkeParams = {
    posteringsdato?: string;
    traadId?: string;
    sakstemakey?: string;
    saksDokumentId?: string;
};

export type DyplenkerQueryParams = {
    ytelse?: string;
};
export type UnikYtelseKey = string;

export function useInfotabsDyplenker(): Dyplenker {
    const params = useParams<DyplenkeParams>();
    const queryParams = useQueryParams<DyplenkerQueryParams>();
    const paths = usePaths();
    const sakerRouting = useSakerRouting();

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
            saker: sakerRouting,
            ytelser: {
                link: (unikId: string) => `${paths.ytelser}?ytelse=${unikId}`,
                route: `${paths.ytelser}/:unikId?`,
                erValgt: (unikId: UnikYtelseKey) => unikId === queryParams.ytelse,
                erQueryParamNull: () => queryParams.ytelse === undefined || queryParams.ytelse === ''
            }
        }),
        [paths, params, sakerRouting, queryParams]
    );
}
