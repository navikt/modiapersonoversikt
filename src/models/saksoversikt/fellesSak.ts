import moment from 'moment';

export enum Baksystem {
    Gsak = 'GSAK',
    Pesys  = 'PESYS',
    SakOgBehandling = 'SAK_OG_BEHANDLING',
    Joark = 'JOARK',
    JoarkSikkerhetsbegrensning = 'JOARK_SIKKERHETSBEGRENSNING',
    Henvendelse = 'HENVENDELSE',
    PdfKonvertering = 'PDF_KONVERTERING',
    Aktoer = 'AKTOER',
    Kodeverk = 'KODEVERK'
}

export interface Saksdato {
    år: number;
    måned: number;
    dag: number;
    time: number;
    minutt: number;
    sekund: number;
}

export function saksdatoSomDate(saksdato: Saksdato): Date {
    return moment(`${saksdato.år}-${padZero(saksdato.måned)}-${padZero(saksdato.dag)}`).toDate();
}

function padZero(date: number): string {
   return date > 9 ? `${date}` : `0${date}`;
}