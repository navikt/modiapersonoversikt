import { Skatt, Trekk, Utbetaling, Ytelse, Ytelseskomponent } from '../../../../../models/utbetalinger';
import { formaterDato } from '../../../../../utils/string-utils';
import { Periode } from '../../../../../models/tid';
import moment from 'moment';
import { loggError } from '../../../../../utils/logger/frontendLogger';
import { UtbetalingFilterState, PeriodeValg } from '../../../../../redux/utbetalinger/types';
import { datoVerbose } from '../../../../../utils/date-utils';
import dayjs from 'dayjs';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';

export const utbetaltTilBruker = 'Bruker';

export function maanedOgAarForUtbetaling(utbetaling: Utbetaling) {
    const verbose = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling));
    return `${verbose.måned} ${verbose.år}`;
}

export function utbetalingDatoComparator(a: Utbetaling, b: Utbetaling) {
    return moment(getGjeldendeDatoForUtbetaling(b)).unix() - moment(getGjeldendeDatoForUtbetaling(a)).unix();
}

export function ytelseBelopDescComparator(a: Ytelseskomponent, b: Ytelseskomponent) {
    return b.ytelseskomponentbeløp - a.ytelseskomponentbeløp;
}

export function skattBelopAscComparator(a: Skatt, b: Skatt) {
    return a.skattebeløp - b.skattebeløp;
}

export function trekkBelopAscComparator(a: Trekk, b: Trekk) {
    return a.trekkbeløp - b.trekkbeløp;
}

export function getUtbetalingerForSiste30DagerDatoer() {
    return {
        fra: moment()
            .subtract(30, 'day')
            .startOf('day')
            .toDate(),
        til: moment()
            .add(100, 'day')
            .endOf('day')
            .toDate()
    };
}

export function getFraDateFromFilter(filter: UtbetalingFilterState): Date {
    switch (filter.periode.radioValg) {
        case PeriodeValg.INNEVÆRENDE_ÅR:
            return moment()
                .startOf('year')
                .toDate();
        case PeriodeValg.I_FJOR:
            return moment()
                .subtract(1, 'year')
                .startOf('year')
                .toDate();
        case PeriodeValg.EGENDEFINERT:
            return dayjs(filter.periode.egendefinertPeriode.fra, ISO_DATE_STRING_FORMAT).toDate();
        case PeriodeValg.SISTE_30_DAGER:
        default:
            return getUtbetalingerForSiste30DagerDatoer().fra;
    }
}

export function getTilDateFromFilter(filter: UtbetalingFilterState): Date {
    switch (filter.periode.radioValg) {
        case PeriodeValg.I_FJOR:
            return moment()
                .subtract(1, 'year')
                .endOf('year')
                .toDate();
        case PeriodeValg.EGENDEFINERT:
            return dayjs(filter.periode.egendefinertPeriode.til, ISO_DATE_STRING_FORMAT).toDate();
        case PeriodeValg.INNEVÆRENDE_ÅR:
        case PeriodeValg.SISTE_30_DAGER:
        default:
            return getUtbetalingerForSiste30DagerDatoer().til;
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

export function getNettoSumYtelser(ytelser: Ytelse[]): number {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.nettobeløp, 0);
}

export function getBruttoSumYtelser(ytelser: Ytelse[]): number {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.ytelseskomponentersum, 0);
}

export function getTrekkSumYtelser(ytelser: Ytelse[]): number {
    return ytelser.reduce((acc: number, ytelse: Ytelse) => acc + ytelse.skattsum + ytelse.trekksum, 0);
}

export function formaterNOK(beløp: number): string {
    return beløp.toLocaleString('no', { minimumFractionDigits: 2 });
}

export function filtrerBortUtbetalingerSomIkkeErUtbetalt(utbetaling: Utbetaling): boolean {
    return utbetaling.status.toLowerCase() === 'utbetalt';
}

export function summertBeløpStringFraUtbetalinger(
    utbetalinger: Utbetaling[],
    getSumFromYtelser: (ytelser: Ytelse[]) => number
): string {
    try {
        const sum = utbetalinger
            .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
            .reduce((acc: number, utbetaling: Utbetaling) => {
                if (!utbetaling.ytelser) {
                    loggError(
                        new Error('Kunne ikke beregne sum på utbetaling'),
                        '"ytelser" er ikke definert på utbetaling, sum må beregnes fra ytelser',
                        { utbetaling: utbetaling }
                    );
                    throw new Error();
                }

                return acc + getSumFromYtelser(utbetaling.ytelser);
            }, 0);

        return formaterNOK(sum);
    } catch (e) {
        return 'Manglende data';
    }
}

export function flatMapYtelser(utbetalinger?: Utbetaling[]): Ytelse[] {
    if (!utbetalinger) {
        return [];
    }
    try {
        const ytelser = utbetalinger.sort(utbetalingDatoComparator).reduce((acc: Ytelse[], utbetaling: Utbetaling) => {
            if (!utbetaling.ytelser) {
                throw new Error('"ytelser" er ikke definert på utbetaling');
            }
            return [...acc, ...utbetaling.ytelser];
        }, []);
        return ytelser;
    } catch (e) {
        console.error('Feil med data i utbetalinger, kunne ikke finne ytelser for alle utbetalinger', e.message);
        return [];
    }
}

export function getPeriodeFromYtelser(ytelser: Ytelse[]): Periode {
    console.log('debug', moment().format(), moment(0).format());
    return ytelser.reduce(
        (acc: Periode, ytelse: Ytelse) => {
            if (!ytelse.periode) {
                return acc;
            }
            return {
                fra: moment(ytelse.periode.start).isBefore(moment(acc.fra)) ? ytelse.periode.start : acc.fra,
                til: moment(ytelse.periode.slutt).isAfter(moment(acc.til)) ? ytelse.periode.slutt : acc.til
            };
        },
        {
            fra: moment().format(),
            til: moment(0).format()
        }
    );
}

export function reduceUtbetlingerTilYtelser(utbetalinger: Utbetaling[]): Ytelse[] {
    return utbetalinger.reduce((acc: Ytelse[], utbetaling: Utbetaling) => {
        if (!utbetaling.ytelser) {
            throw new Error('Utbetaling mangler ytelser');
        }
        return [...acc, ...utbetaling.ytelser];
    }, []);
}

export const getTypeFromYtelse = (ytelse: Ytelse) => ytelse.type || 'Mangler beskrivelse';

export function fjernTommeUtbetalinger(utbetaling: Utbetaling) {
    return utbetaling.ytelser && utbetaling.ytelser.length > 0;
}
