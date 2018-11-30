import { Foreldrepengerperiode, Foreldrepengerrettighet } from '../../../../../models/ytelse/foreldrepenger';
import { KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { Periode } from '../../../../../models/periode';
import { dateComparator } from '../../../../../utils/dateUtils';
import { loggError } from '../../../../../utils/frontendLogger';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';

export function utledFraDatoForRettighet(foreldrepenger: Foreldrepengerrettighet): Date {
    return foreldrepenger.periode
        .map(periode => new Date(periode.foreldrepengerFom))
        .sort(dateComparator)[0];
}

function getAlleKommendeUtbetalinger(foreldrePenger: Foreldrepengerrettighet) {
    return foreldrePenger.periode
        .reduce(
            (acc: KommendeUtbetaling[], periode: Foreldrepengerperiode) =>
                [...acc, ...periode.kommendeUtbetalinger]
            ,
            []);
}

function getAlleVedtaksPerioder(alleKommendeUtbetalinger: KommendeUtbetaling[]) {
    return alleKommendeUtbetalinger.map(utbetaling => {
        if (!utbetaling.vedtak) {
            throw new Error('Kommende utbetaling i foreldrepengerettighet mangler vedtak');
        }
        return utbetaling.vedtak;
    });
}

export function utledMaksDato(foreldrePenger: Foreldrepengerrettighet): string {
    const alleKommendeUtbetalinger: KommendeUtbetaling[] = getAlleKommendeUtbetalinger(foreldrePenger);
    try {
        const alleVedtaksPerioder: Array<Periode> = getAlleVedtaksPerioder(alleKommendeUtbetalinger);
        const alleTilDatoerDecending =  alleVedtaksPerioder
            .map(periode => new Date(periode.til))
            .sort(dateComparator)
            .reverse();
        return datoVerbose(alleTilDatoerDecending[0]).sammensatt;
    } catch (error) {
        loggError(error, 'Mangler data for å utlede maks dato', {alleKommendeUtbetalinger: alleKommendeUtbetalinger});
        return 'Mangler data';
    }
}