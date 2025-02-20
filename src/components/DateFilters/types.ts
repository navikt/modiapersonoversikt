import type { Dayjs } from 'dayjs';

export enum PeriodType {
    LAST_30_DAYS = 'Siste 30 dager',
    THIS_YEAR = 'Inneværende år',
    LAST_YEAR = 'I fjor',
    CUSTOM = 'Egendefinert'
}

export interface DateRange {
    from: Dayjs;
    to: Dayjs;
}
