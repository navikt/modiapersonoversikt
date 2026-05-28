import type { Dayjs } from 'dayjs';

export enum PeriodType {
    UNSET = '',
    LAST_30_DAYS = 'Siste 30 dager',
    THIS_YEAR = 'Inneværende år',
    LAST_YEAR = 'I fjor',
    LAST_TWO_YEARS = 'Siste to år',
    CUSTOM = 'Egendefinert'
}

export interface DateRange {
    from?: Dayjs;
    to?: Dayjs;
}
