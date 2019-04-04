import { Ytelse } from '../../models/utbetalinger';
import { UtbetalingFilterState } from './types';

export enum actionKeys {
    SettYtelseIFokus = 'SettYtelseIFokus',
    SetEkspanderYtelse = 'SetEkspanderYtelse',
    OppdaterFilter = 'OppdaterFilter'
}

interface SetNyYtelseIFokus {
    type: actionKeys.SettYtelseIFokus;
    ytelse: Ytelse | null;
}

interface SetEkspanderYtelse {
    type: actionKeys.SetEkspanderYtelse;
    ekspander: boolean;
    ytelse: Ytelse;
}

interface OppdaterFilter {
    type: actionKeys.OppdaterFilter;
    change: Partial<UtbetalingFilterState>;
}

export function setNyYtelseIFokus(ytelse: Ytelse | null): SetNyYtelseIFokus {
    return {
        type: actionKeys.SettYtelseIFokus,
        ytelse: ytelse
    };
}

export function setEkspanderYtelse(ytelse: Ytelse, ekspander: boolean): SetEkspanderYtelse {
    return {
        type: actionKeys.SetEkspanderYtelse,
        ekspander: ekspander,
        ytelse: ytelse
    };
}

export function oppdaterFilter(change: Partial<UtbetalingFilterState>): OppdaterFilter {
    return {
        type: actionKeys.OppdaterFilter,
        change: change
    };
}

export type Actions = SetNyYtelseIFokus | SetEkspanderYtelse | OppdaterFilter;
