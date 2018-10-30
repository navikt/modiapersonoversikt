import * as React from 'react';
import { Skatt, Trekk, Utbetaling, Ytelse, Ytelseskomponent } from '../../../../../models/utbetalinger';
import { FilterState, PeriodeValg } from '../filter/Filter';
import { formaterDato } from '../../../../../utils/dateUtils';
import { Periode } from '../../../../../models/periode';
import moment = require('moment');

export const utbetaltTilBruker = 'Bruker';

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

export function datoVerbose(dato?: string | Date) {
    const datoMoment = dato ? moment(dato) : moment();
    const måned = månedTilNavnMapping[datoMoment.month()];
    const år = datoMoment.year();
    const dag = datoMoment.date();
    const klokkeslett = datoMoment.format('HH:mm');
    return {
        dag: dag,
        måned: måned,
        år: år,
        sammensatt: `${dag}. ${måned} ${år}`,
        sammensattMedKlokke: `${dag}. ${måned} ${år} ${klokkeslett}`
    };
}

export function månedOgÅrForUtbetaling(utbetaling: Utbetaling) {
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

export function getFraDateFromFilter(filter: FilterState): Date {
    switch (filter.periode.radioValg) {
        case PeriodeValg.INNEVÆRENDE_ÅR:
            return moment().startOf('year').toDate();
        case PeriodeValg.I_FJOR:
            return moment().subtract(1, 'year').startOf('year').toDate();
        case PeriodeValg.EGENDEFINERT:
            return filter.periode.egendefinertPeriode.fra;
        case PeriodeValg.SISTE_30_DAGER:
        default:
            return moment().subtract(30, 'day').startOf('day').toDate();
    }
}

export function getTilDateFromFilter(filter: FilterState): Date {
    switch (filter.periode.radioValg) {
        case PeriodeValg.I_FJOR:
            return moment().subtract(1, 'year').endOf('year').toDate();
        case PeriodeValg.EGENDEFINERT:
            return filter.periode.egendefinertPeriode.til;
        default:
            return moment().endOf('day').toDate();
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
    return beløp.toLocaleString('no', {minimumFractionDigits: 2});
}

export function filtrerBortUtbetalingerSomIkkeErUtbetalt(utbetaling: Utbetaling): boolean {
    return utbetaling.utbetalingsdato !== null
        // Utbetalinger kan feilaktig ha en utbetalingsdato selv om de er returnert til nav for saksbehandling
        && !utbetaling.status.includes('Returnert til NAV');
}

export function summertBeløpStringFraUtbetalinger(
    utbetalinger: Utbetaling[],
    getSumFromYtelser: (ytelser: Ytelse[]) => number): string {

    try {
        const sum = utbetalinger
            .filter(filtrerBortUtbetalingerSomIkkeErUtbetalt)
            .reduce(
            (acc: number, utbetaling: Utbetaling) => {

                if (!utbetaling.ytelser) {
                    console.error('"ytelser" er ikke definert på utbetaling, sum må beregnes fra ytelser', utbetaling);
                    throw new Error();
                }

                return acc + getSumFromYtelser(utbetaling.ytelser);
            },
            0);

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
        const ytelser = utbetalinger
            .sort(utbetalingDatoComparator)
            .reduce(
            (acc: Ytelse[], utbetaling: Utbetaling) => {
                if (!utbetaling.ytelser) {
                    throw new Error('"ytelser" er ikke definert på utbetaling');
                }
                return [...acc, ...utbetaling.ytelser] ;
            },
            []);
        return ytelser;
    } catch (e) {
        console.error('Feil med data i utbetalinger, kunne ikke finne ytelser for alle utbetalinger', e.message);
        return [];
    }
}

export function createTable(tittelrekke: string[], table: Array<Array<string | number | undefined>>) {
    return (
        <table>
            <thead>
            <tr>
                {tittelrekke.map(tittel => <th key={tittel}>{tittel}</th>)}
            </tr>
            </thead>
            <tbody>
            {table.map((row, index) =>
                <tr key={index}>{row.map((entry, i) =>
                    <td key={i}>{entry}</td>
                )}
                </tr>
            )}
            </tbody>
        </table>
    );
}

export function getPeriodeFromYtelser(ytelser: Ytelse[]): Periode {
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
        });
}

export function reduceUtbetlingerTilYtelser(utbetalinger: Utbetaling[]): Ytelse[] {
    return utbetalinger.reduce(
        (acc: Ytelse[], utbetaling: Utbetaling) => {
            if (!utbetaling.ytelser) {
                throw new Error('Utbetaling mangler ytelser');
            }
            return [...acc, ...utbetaling.ytelser];
        },
        []);
}

export const getTypeFromYtelse = (ytelse: Ytelse) => ytelse.type || 'Mangler beskrivelse';
