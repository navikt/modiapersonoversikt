import { HistoriskUtbetaling, KreditorTrekk } from '../../../../../models/ytelse/ytelse-utbetalinger';
import {
    flatMapYtelser,
    formaterNOK,
    getBruttoSumYtelser,
    getNettoSumYtelser,
    getTypeFromYtelse,
    reduceUtbetlingerTilYtelser
} from '../../utbetalinger/utils/utbetalingerUtils';
import { Utbetaling, Ytelse } from '../../../../../models/utbetalinger';
import { YtelserKeys } from '../ytelserKeys';

export function getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling: HistoriskUtbetaling): string {
    if (!historiskUtbetaling.trekk || historiskUtbetaling.trekk.length === 0) {
        return '';
    }
    const trekkSummert = historiskUtbetaling.trekk.reduce((acc: number, trekk: KreditorTrekk) => acc + trekk.beløp, 0);
    return formaterNOK(trekkSummert) + ' NOK';
}

export function mapUtbetalingerTilHistoriskeUtbetalinger(utbetalinger: Utbetaling[]): HistoriskUtbetaling[] {
    return utbetalinger.reduce(
        (acc: HistoriskUtbetaling[], utbetaling: Utbetaling) => [
            ...acc,
            ...mapUtbetalingTilHistoriskeUtbetalinger(utbetaling)
        ],
        []
    );
}

function mapUtbetalingTilHistoriskeUtbetalinger(utbetaling: Utbetaling): HistoriskUtbetaling[] {
    const alleTilhørendeYtelser = flatMapYtelser([utbetaling]);
    return alleTilhørendeYtelser.map(ytelse => mapYtelseTilHistoriskUtbetaling(ytelse, utbetaling));
}

function mapYtelseTilHistoriskUtbetaling(ytelse: Ytelse, utbetaling: Utbetaling): HistoriskUtbetaling {
    const nettoSum = getNettoSumYtelser([ytelse]);
    const bruttoSum = getBruttoSumYtelser([ytelse]);
    return {
        vedtak: {
            fra: ytelse.periode.start,
            til: ytelse.periode.slutt
        },
        utbetalingsgrad: null,
        utbetalingsdato: utbetaling.utbetalingsdato,
        nettobeløp: nettoSum,
        bruttobeløp: bruttoSum,
        skattetrekk: ytelse.skattsum,
        arbeidsgiverNavn: null,
        arbeidsgiverOrgNr: null,
        dagsats: null,
        type: ytelse.type,
        trekk: mapTrekkTilKreditortrekk(ytelse)
    };
}

function mapTrekkTilKreditortrekk(ytelse: Ytelse): null | KreditorTrekk[] {
    if (!ytelse.trekkListe) {
        return null;
    }
    return ytelse.trekkListe.map(trekk => {
        return {
            kreditorsNavn: trekk.kreditor || '',
            beløp: trekk.trekkbeløp
        };
    });
}

export function fjernUrelevanteUtbetalinger(relevantYtelse: YtelserKeys) {
    return (utbetaling: Utbetaling) => {
        const ytelser = reduceUtbetlingerTilYtelser([utbetaling]).filter(
            ytelse => relevantYtelse === getTypeFromYtelse(ytelse)
        );
        return {
            ...utbetaling,
            ytelser: ytelser
        };
    };
}
