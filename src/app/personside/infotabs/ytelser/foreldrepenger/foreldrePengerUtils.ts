import { Foreldrepengerperiode, Foreldrepengerettighet } from '../../../../../models/ytelse/foreldrepenger';
import { KommendeUtbetaling } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { Periode } from '../../../../../models/periode';
import { ascendingDateComparator } from '../../../../../utils/dateUtils';
import { loggError } from '../../../../../utils/frontendLogger';
import { datoVerbose } from '../../utbetalinger/utils/utbetalingerUtils';

export function utledFraDatoForRettighet(foreldrepenger: Foreldrepengerettighet): Date {
    return foreldrepenger.periode
        .map(periode => new Date(periode.foreldrepengerFom))
        .sort(ascendingDateComparator)[0];
}

function getAlleKommendeUtbetalinger(foreldrePenger: Foreldrepengerettighet) {
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

export function utledMaksDato(foreldrePenger: Foreldrepengerettighet): string {
    const alleKommendeUtbetalinger: KommendeUtbetaling[] = getAlleKommendeUtbetalinger(foreldrePenger);
    try {
        const alleVedtaksPerioder: Array<Periode> = getAlleVedtaksPerioder(alleKommendeUtbetalinger);
        const alleTilDatoerDecending =  alleVedtaksPerioder
            .map(periode => new Date(periode.til))
            .sort(ascendingDateComparator)
            .reverse();
        return datoVerbose(alleTilDatoerDecending[0]).sammensatt;
    } catch (error) {
        loggError(error, 'Mangler data for å utlede maks dato', {alleKommendeUtbetalinger: alleKommendeUtbetalinger});
        return 'Mangler data';
    }
}