import { atom } from 'jotai';
import { PeriodeOptions, PeriodeValg } from 'src/redux/utbetalinger/types';
import dayjs from 'dayjs';
import { ISO_DATE_FORMAT } from 'src/utils/date-utils';

export const aktivBrukerAtom = atom<string>();
export const aktivEnhetAtom = atom<string>();
export const ytelsePeriodeAtom = atom<PeriodeOptions>({
    radioValg: PeriodeValg.EGENDEFINERT,
    egendefinertPeriode: {
        fra: dayjs().subtract(2, 'year').format(ISO_DATE_FORMAT),
        til: dayjs().format(ISO_DATE_FORMAT)
    }
});
