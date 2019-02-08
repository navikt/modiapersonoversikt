import { HistoriskUtbetaling, KreditorTrekk } from '../../../../../models/ytelse/ytelse-utbetalinger';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';

export function getFormatertKreditortrekkFraHistoriskUtbetaling(historiskUtbetaling: HistoriskUtbetaling): string {
    if (!historiskUtbetaling.trekk) {
        return '';
    }
    const trekkSummert = historiskUtbetaling.trekk.reduce((acc: number, trekk: KreditorTrekk) => acc + trekk.beløp, 0);
    return formaterNOK(trekkSummert) + ' NOK';
}
