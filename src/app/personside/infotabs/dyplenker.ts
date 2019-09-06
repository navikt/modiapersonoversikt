import moment from 'moment';
import { usePaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { RouteComponentProps } from 'react-router';
import { Traad } from '../../../models/meldinger/meldinger';
import { useRestResource } from '../../../utils/customHooks';
import { hasData } from '../../../rest/utils/restResource';
import { Sakstema } from '../../../models/saksoversikt/sakstema';
import { getUnikSakstemaKey, useAgregerteSaker } from './saksoversikt/utils/saksoversiktUtils';
import { useMemo } from 'react';

export function useInfotabsDyplenker() {
    const paths = usePaths();
    return useMemo(
        () => ({
            utbetaling: {
                link: (utbetaling: Utbetaling) => `${paths.utbetlainger}/${moment(utbetaling.posteringsdato).unix()}`,
                route: `${paths.utbetlainger}/:posteringsdato?`
            },
            meldinger: {
                link: (traad: Traad) => `${paths.meldinger}/${traad.traadId}`,
                route: `${paths.meldinger}/:traadId?`
            },
            saker: {
                link: (saksTema: Sakstema) => `${paths.saker}/${getUnikSakstemaKey(saksTema)}`,
                route: `${paths.saker}/:sakstemakey?`
            }
        }),
        [paths]
    );
}

export type UtbetalingDyplenkeRouteComponentProps = RouteComponentProps<{ posteringsdato: string }>;
export type MeldingerDyplenkeRouteComponentProps = RouteComponentProps<{ traadId: string }>;
export type SakerDyplenkeRouteComponentProps = RouteComponentProps<{ sakstemakey: string }>;

export const erValgtIDyplenke = {
    utbetaling: (utbetaling: Utbetaling, routeProps: UtbetalingDyplenkeRouteComponentProps) => {
        const posteringsdatoFraUrl = moment.unix((routeProps.match.params.posteringsdato as unknown) as number);
        return moment(utbetaling.posteringsdato).isSame(posteringsdatoFraUrl);
    },
    meldinger: (traad: Traad, routeProps: MeldingerDyplenkeRouteComponentProps) =>
        traad.traadId === routeProps.match.params.traadId,
    saker: (sakstema: Sakstema, routeProps: SakerDyplenkeRouteComponentProps) =>
        getUnikSakstemaKey(sakstema) === routeProps.match.params.sakstemakey
};

export function useValgtTraadIUrl(routeProps: MeldingerDyplenkeRouteComponentProps): Traad | undefined {
    const traader = useRestResource(resources => resources.tråderOgMeldinger);
    if (!hasData(traader)) {
        return undefined;
    }
    return traader.data.find(traad => erValgtIDyplenke.meldinger(traad, routeProps));
}

export function useValgtSakstemaIUrl(routeProps: SakerDyplenkeRouteComponentProps) {
    const sakstemaResource = useRestResource(resources => resources.sakstema);
    const agregerteSaker = useAgregerteSaker();
    if (!hasData(sakstemaResource) || !agregerteSaker) {
        return undefined;
    }
    return [agregerteSaker, ...sakstemaResource.data.resultat].find(st => erValgtIDyplenke.saker(st, routeProps));
}
