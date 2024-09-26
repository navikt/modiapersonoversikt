import dayjs from 'dayjs';
import { PeriodeOptions, PeriodeValg } from '../utbetalinger/types';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';

export interface OppfolgingState {
    periode: PeriodeOptions;
    sykefraverEkspandert: boolean;
    ytelserEkspandert: boolean;
}

export const initialState: OppfolgingState = {
    periode: {
        radioValg: PeriodeValg.EGENDEFINERT,
        egendefinertPeriode: {
            fra: dayjs().subtract(2, 'year').format(ISO_DATE_STRING_FORMAT),
            til: dayjs().format(ISO_DATE_STRING_FORMAT)
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

export interface SetSykefraverEkspandertAction {
    type: OppfolgingActionTypes.SetSykefraverEkspandert;
    ekspandert: boolean;
}

export interface SetYtelserEkspandertAction {
    type: OppfolgingActionTypes.SetYtelserEkspandert;
    ekspandert: boolean;
}

export type OppfolgingActions = SetValgtPeriode | SetSykefraverEkspandertAction | SetYtelserEkspandertAction;
