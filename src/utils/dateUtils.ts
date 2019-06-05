import moment from 'moment';
import 'moment/locale/nb';
import navfaker from 'nav-faker';

const DATO_FORMAT = 'DD.MM.YYYY';
const DATO_TID_FORMAT = 'DD.MM.YYYY HH:mm';

export function formatterDato(dato: string | Date) {
    return moment(dato).format(DATO_FORMAT);
}

export function formatterDatoTid(dato: string | Date) {
    return moment(dato).format(DATO_TID_FORMAT);
}

export function formatterDatoTidNaa() {
    return moment().format(DATO_TID_FORMAT);
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
    const datoMoment = dato ? moment(dato) : moment();
    const måned = månedTilNavnMapping(datoMoment.month());
    const år = datoMoment.year();
    const dag = datoMoment.date();
    const klokkeslett = datoMoment.format('HH:mm');
    return {
        dag: dag,
        måned: måned,
        år: år,
        sammensatt: `${dag}. ${måned} ${år}`,
        sammensattMedKlokke: `${dag}. ${måned} ${år} ${klokkeslett}`,
        meldingerFormat: `${dag}. ${måned} ${år}, klokken ${klokkeslett}`
    };
}

export function isValidDate(streng: string) {
    const timestamp = Date.parse(streng);
    return !isNaN(timestamp);
}

export function erImorgenEllerSenere(date: Date) {
    return moment(date).isAfter(new Date(), 'day');
}

export function erMaksEttÅrFramITid(date: Date) {
    const ettÅrFramITid = moment().add(1, 'years');
    return moment(date).isSameOrBefore(ettÅrFramITid);
}

export function getAlderFromFødselsnummer(fødselsnummer: string) {
    return moment().diff(navfaker.personIdentifikator.getFødselsdato(fødselsnummer), 'years');
}

export function getOldestDate<T extends string | Date>(date1: T, date2: T): T {
    return new Date(date1) < new Date(date2) ? date1 : date2;
}

export function getNewestDate<T extends string | Date>(date1: T, date2: T): T {
    return new Date(date1) > new Date(date2) ? date1 : date2;
}

export function ascendingDateComparator(a: Date, b: Date) {
    if (+a === +b) {
        //converterer til int for å sjekke equality
        return 0;
    }
    return a > b ? 1 : -1;
}

export function datoStigende<T>(getDate: (element: T) => Date | string) {
    return (a: T, b: T): number => ascendingDateComparator(new Date(getDate(a)), new Date(getDate(b)));
}

export function datoSynkende<T>(getDate: (element: T) => Date | string) {
    return (a: T, b: T): number => -ascendingDateComparator(new Date(getDate(a)), new Date(getDate(b)));
}
