import dayjs from 'dayjs';
import { ISO_DATE_FORMAT } from 'src/utils/date-utils';
import { type PeriodeOptions, PeriodeValg } from '../utbetalinger/types';

export interface OppfolgingState {
    periode: PeriodeOptions;
    sykefraverEkspandert: boolean;
    ytelserEkspandert: boolean;
}

export const initialState: OppfolgingState = {
    periode: {
        radioValg: PeriodeValg.EGENDEFINERT,
        egendefinertPeriode: {
            fra: dayjs().subtract(2, 'year').format(ISO_DATE_FORMAT),
            til: dayjs().format(ISO_DATE_FORMAT)
        }
    },
    sykefraverEkspandert: false,
    ytelserEkspandert: false
};

export enum OppfolgingActionTypes {
    SetValgtPeriode = 'SetValgtPeriode',
    SetSykefraverEkspandert = 'SetSykefraværEkspandert',
    SetYtelserEkspandert = 'SetYtelserEkspandert'
}

export interface SetValgtPeriode {
    type: OppfolgingActionTypes.SetValgtPeriode;
    periodeEndring: PeriodeOptions;
}

interface SetSykefraverEkspandertAction {
    type: OppfolgingActionTypes.SetSykefraverEkspandert;
    ekspandert: boolean;
}

interface SetYtelserEkspandertAction {
    type: OppfolgingActionTypes.SetYtelserEkspandert;
    ekspandert: boolean;
}

export type OppfolgingActions = SetValgtPeriode | SetSykefraverEkspandertAction | SetYtelserEkspandertAction;
