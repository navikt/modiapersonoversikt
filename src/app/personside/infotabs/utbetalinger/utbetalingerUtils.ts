import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';
import { FilterState, PeriodeValg } from './Filter';
import moment = require('moment');
import { formaterDato } from '../../../../utils/dateUtils';

const månedTilNavnMapping = {
    0: 'Januar',
    1: 'Februar',
    2: 'Mars',
    3: 'April',
    4: 'Mai',
    5: 'Juni',
    6: 'Juli',
    7: 'August',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Desember'
};

export function datoVerbose(dato: string | Date) {
    const måned = månedTilNavnMapping[moment(dato).month()];
    const år = moment(dato).year();
    const dag = moment(dato).date();
    return {
        dag: dag,
        måned: måned,
        år: år,
        sammensatt: `${dag}. ${måned} ${år}`
    };
}

export function månedOgÅrForUtbetaling(utbetaling: Utbetaling) {
    const verbose = datoVerbose(utbetaling.posteringsdato);
    return `${verbose.måned} ${verbose.år}`;
}

export function utbetalingDatoComparator(a: Utbetaling, b: Utbetaling) {
    return moment(getGjeldendeDatoForUtbetaling(b)).unix() - moment(getGjeldendeDatoForUtbetaling(a)).unix();
}

export function getFraDateFromFilter(filter: FilterState): Date {
    let returDato = new Date();
    returDato.setHours(0, 0, 0, 0);
    switch (filter.periode.radioValg) {
        case PeriodeValg.INNEVÆRENDE_ÅR:
            returDato.setMonth(0);
            returDato.setDate(1);
            return returDato;
        case PeriodeValg.I_FJOR:
            returDato.setDate(1);
            returDato.setMonth(0);
            returDato.setFullYear(returDato.getFullYear() - 1);
            return returDato;
        case PeriodeValg.EGENDEFINERT:
            return filter.periode.egendefinertPeriode.fra;
        case PeriodeValg.SISTE_30_DAGER:
        default:
            returDato.setDate(returDato.getDate() - 30);
            return returDato;
    }
}

export function getTilDateFromFilter(filter: FilterState): Date {
    let returDato = new Date();
    returDato.setHours(0, 0, 0, 0);
    switch (filter.periode.radioValg) {
        case PeriodeValg.I_FJOR:
            returDato.setMonth(11);
            returDato.setDate(31);
            returDato.setFullYear(returDato.getFullYear() - 1);
            return returDato;
        case PeriodeValg.EGENDEFINERT:
            return filter.periode.egendefinertPeriode.til;
        default:
            returDato.setDate(returDato.getDate() + 30);
            return returDato;
    }
}

export function getGjeldendeDatoForUtbetaling(utbetaling: Utbetaling): string {
    return utbetaling.utbetalingsdato || utbetaling.forfallsdato || utbetaling.posteringsdato;
}

export function periodeStringFromYtelse(ytelse: Ytelse): string {
    return ytelse.periode
        ? `${formaterDato(ytelse.periode.start)} - ${formaterDato(ytelse.periode.slutt)}`
        : 'Periode for ytelse ikke funnet';
}

export function getNettoSumUtbetaling(utbetaling: Utbetaling): number {
    if (utbetaling.ytelser) {
        return utbetaling.ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobeløp, 0);
    }
    return -0; // TODO
}

export function getBruttoSumUtbetaling(utbetaling: Utbetaling): number {
    if (utbetaling.ytelser) {
        return utbetaling.ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.ytelseskomponentersum, 0);
    }
    return -0; // TODO
}

export function getTrekkSumUtbetaling(utbetaling: Utbetaling): number {
    if (utbetaling.ytelser) {
        return utbetaling.ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.skattsum + ytelse.trekksum, 0);
    }
    return -0; // TODO
}

export function formaterNOK(beløp: number): string {
    return beløp.toLocaleString('no', { minimumFractionDigits: 2 });
}
