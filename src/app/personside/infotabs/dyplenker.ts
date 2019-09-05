import moment from 'moment';
import { usePaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { RouteComponentProps } from 'react-router';
import { Traad } from '../../../models/meldinger/meldinger';
import { useRestResource } from '../../../utils/customHooks';
import { hasData } from '../../../rest/utils/restResource';

export function useInfotabsDyplenker() {
    const paths = usePaths();
    return {
        utbetaling: {
            link: (utbetaling: Utbetaling) => `${paths.utbetlainger}/${moment(utbetaling.posteringsdato).unix()}`,
            route: `${paths.utbetlainger}/:posteringsdato?`
        },
        meldinger: {
            link: (traad: Traad) => `${paths.meldinger}/${traad.traadId}`,
            route: `${paths.meldinger}/:traadId?`
        }
    };
}

export type UtbetalingDyplenkeRouteComponentProps = RouteComponentProps<{ posteringsdato: string }>;
export type MeldingerDyplenkeRouteComponentProps = RouteComponentProps<{ traadId: string }>;

export const erValgtIDyplenke = {
    utbetaling: (utbetaling: Utbetaling, routeProps: UtbetalingDyplenkeRouteComponentProps) => {
        const posteringsdatoFraUrl = moment.unix((routeProps.match.params.posteringsdato as unknown) as number);
        return moment(utbetaling.posteringsdato).isSame(posteringsdatoFraUrl);
    },
    meldinger: (traad: Traad, routeProps: MeldingerDyplenkeRouteComponentProps) =>
        traad.traadId === routeProps.match.params.traadId
};

export function useValgtTraadIUrl(routeProps: MeldingerDyplenkeRouteComponentProps): Traad | undefined {
    const traader = useRestResource(resources => resources.tråderOgMeldinger);
    if (!hasData(traader)) {
        return undefined;
    }
    return traader.data.find(traad => erValgtIDyplenke.meldinger(traad, routeProps));
}
