import dayjs from 'dayjs';
import { atom } from 'jotai';
import { type PeriodeOptions, PeriodeValg } from 'src/redux/utbetalinger/types';
import { ISO_DATE_FORMAT } from 'src/utils/date-utils';

export const ytelsePeriodeAtom = atom<PeriodeOptions>({
    radioValg: PeriodeValg.EGENDEFINERT,
    egendefinertPeriode: {
        fra: dayjs().subtract(2, 'year').format(ISO_DATE_FORMAT),
        til: dayjs().format(ISO_DATE_FORMAT)
    }
});
