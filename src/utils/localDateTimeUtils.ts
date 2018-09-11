// Fordi vi har et restendepunkt som eksporterer java.time.LocalDateTime dypserialisert, så lager jeg en util
// for å fikse det. Vi bør vurdere å gjøre om backend for å gjøre dette på en annen måte

export interface LocalDateTimeType {
    year: number;
    hour: number;
    minute: number;
    second: number;
    dayOfMonth: number;
    monthValue: number;
}

export function lagDateAvLocalDateTime(ldt: LocalDateTimeType): Date {
    let date = new Date();
    date.setFullYear(ldt.year, ldt.monthValue, ldt.dayOfMonth);
    date.setHours(ldt.hour, ldt.minute, ldt.second);
    return date;
}

// Så har vi et restendepunkt som eksporterer Optional joda DateTime... Vi må håndtere dette også

export interface OptionalJodaDateTimeType {
    present?: boolean;
    year?: number;
    hourOfDay?: number;
    minuteOfHour?: number;
    secondOfMinute?: number;
    dayOfMonth?: number;
    monthOfYear?: number;
}

export function lagDateAvOptionalJodaDateTime(jdt: OptionalJodaDateTimeType): Date | null {
    if (jdt.present === false) {
        return null;
    }
    let date = new Date();
    if (jdt.year) { date.setFullYear(jdt.year, jdt.monthOfYear, jdt.dayOfMonth); }
    if (jdt.hourOfDay) { date.setHours(jdt.hourOfDay, jdt.minuteOfHour, jdt.secondOfMinute); }
    return date;
}