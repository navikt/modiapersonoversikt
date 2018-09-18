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
    let date = new Date();
    date.setFullYear(saksdato.år, saksdato.måned, saksdato.dag);
    date.setHours(saksdato.time, saksdato.minutt, saksdato.sekund);
    return date;
}