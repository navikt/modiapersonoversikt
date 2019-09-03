import moment from 'moment';
import { usePaths } from '../../routes/routing';
import { Utbetaling } from '../../../models/utbetalinger';
import { RouteComponentProps } from 'react-router';

interface DypLenkeParams {
    link: (element: any) => string;
    route: string;
}

export type UtbetalingDyplenkeRouteComponentProps = RouteComponentProps<{ posteringsdato: string }>;

export function useInfotabsDyplenker(): { [name: string]: DypLenkeParams } {
    const paths = usePaths();
    return {
        utbetaling: {
            link: (utbetaling: Utbetaling) => `${paths.utbetlainger}/${moment(utbetaling.posteringsdato).unix()}`,
            route: `${paths.utbetlainger}/:posteringsdato?`
        }
    };
}

export const erValgtIDyplenke = {
    utbetaling: (utbetaling: Utbetaling, routeProps: UtbetalingDyplenkeRouteComponentProps) => {
        const posteringsdatoFraUrl = moment.unix((routeProps.match.params.posteringsdato as unknown) as number);
        return moment(utbetaling.posteringsdato).isSame(posteringsdatoFraUrl);
    }
};
