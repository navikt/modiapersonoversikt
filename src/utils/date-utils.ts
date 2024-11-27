import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore';
import { loggError } from './logger/frontendLogger';
import { ISO_DATE_STRING_FORMAT } from 'nav-datovelger/lib/utils/dateFormatUtils';

dayjs.locale('nb');
dayjs.extend(isSameOrBeforePlugin);

export const ISO_DATE_FORMAT = ISO_DATE_STRING_FORMAT;
export const backendDatoformat: string = 'YYYY-MM-DD';
export const backendDatoTidformat: string = 'YYYY-MM-DD HH:mm';

const DATO_FORMAT = 'DD.MM.YYYY';
const DATO_FORMAT_MANEDSNAVN = 'DD. MMM YYYY';
const DATO_TID_FORMAT = 'DD.MM.YYYY HH:mm';
const DATO_TID_MANEDSNANV_FORMAT = 'DD. MMM YYYY HH:mm';

export function formatterDato(dato: string | Date) {
    return dayjs(dato).format(DATO_FORMAT);
}

export function formatterDatoMedMaanedsnavn(dato: string | Date) {
    return dayjs(dato).format(DATO_FORMAT_MANEDSNAVN);
}

export function formatterDatoMedMaanedsnavnOrNull(dato: string | Date | undefined | null): string | null {
    if (dato !== undefined && dato !== null) {
        return formatterDatoMedMaanedsnavn(dato);
    }
    return null;
}

export function formatterDatoTid(dato: string | Date) {
    return dayjs(dato).format(DATO_TID_FORMAT);
}

export function formatterDatoTidMedMaanedsnavn(dato?: string | Date) {
    return dayjs(dato).format(DATO_TID_MANEDSNANV_FORMAT);
}

const månedTilNavnMapping = (månednr: number) => {
    switch (månednr) {
        case 0:
            return 'Januar';
        case 1:
            return 'Februar';
        case 2:
            return 'Mars';
        case 3:
            return 'April';
        case 4:
            return 'Mai';
        case 5:
            return 'Juni';
        case 6:
            return 'Juli';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'Oktober';
        case 10:
            return 'November';
        case 11:
            return 'Desember';
        default:
            return 'N/A';
    }
};

export function datoVerbose(dato?: string | Date) {
    const parsedDato = dato ? dayjs(dato) : dayjs();
    const måned = månedTilNavnMapping(parsedDato.month());
    const år = parsedDato.year();
    const dag = parsedDato.date();
    const klokkeslett = parsedDato.format('HH:mm');
    return {
        dag: dag,
        måned: måned,
        år: år,
        sammensatt: `${dag}. ${måned} ${år}`,
        sammensattMedKlokke: `${dag}. ${måned} ${år} ${klokkeslett}`,
        meldingerFormat: `${dag}. ${måned} ${år}, klokken ${klokkeslett}`
    };
}

export function erImorgenEllerSenere(date: Date) {
    return dayjs(date).isAfter(new Date(), 'day');
}

export function erMaks10MinSiden(date: string | Date) {
    return dayjs(date).isAfter(dayjs().subtract(10, 'minute'));
}

export function erMaksEttÅrFramITid(date: Date) {
    const ettÅrFramITid = dayjs().add(1, 'years');
    return dayjs(date).isSameOrBefore(ettÅrFramITid);
}

export function getOldestDate<T extends string | Date>(date1: T, date2: T): T {
    return dayjs(date1).isBefore(date2) ? date1 : date2;
}

export function getNewestDate<T extends string | Date>(date1: T, date2: T): T {
    return dayjs(date1).isAfter(date2) ? date1 : date2;
}

export function ascendingDateComparator(a: Date | string, b: Date | string) {
    const dateA = dayjs(a);
    const dateB = dayjs(b);
    if (!dateA.isValid() || !dateB.isValid()) {
        loggError(Error('Invalid date in date comparator'), undefined, { datoA: a, datoB: b });
    }
    return +dateA - +dateB;
}

export function datoStigende<T>(getDate: (element: T) => Date | string) {
    return (a: T, b: T): number => ascendingDateComparator(getDate(a), getDate(b));
}

export function datoSynkende<T>(getDate: (element: T) => Date | string) {
    return (a: T, b: T): number => -ascendingDateComparator(getDate(a), getDate(b));
}
