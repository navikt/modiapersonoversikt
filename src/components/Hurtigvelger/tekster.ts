export interface Tekst {
    tittel: string;
    tekst: string;
}

export type ITekster = Tekst[];

export const tekster: ITekster = [
    {
        tittel: 'Henvist www.nav.no',
        tekst: 'Aremark Testfamilien er henvist til informasjon på www.nav.no'
    },
    {
        tittel: 'Veiledet www.nav.no (skjermdeling)',
        tekst: 'Aremark Testfamilien er blitt veiledet i bruk av www.nav.no'
    },
    {
        tittel: 'Generell informasjon',
        tekst:
            'Aremark Testfamilien har fått generell informasjon om NAVs tjenester og ytelser, og er henvist til mer informasjon på www.nav.no.'
    },
    {
        tittel: 'Utbetaling',
        tekst:
            'Aremark Testfamilien har informasjon om å følge med på www.nav.no/utbetaling for informasjon og status om utbetalingen sin.'
    },
    {
        tittel: 'Skatt',
        tekst: `Aremark Testfamilien har spørsmål om skattetrekk.
Du har fått informasjon om at:
- vi har brukt skattetrekket som vi har fått overført fra skatteetaten
- hvis du mener skattetrekket er feil må du endre skattekortet selv på www.skatteetaten.no
Du har også fått informasjon om at du kan lese mer på http://www.nav.no/skatt`
    },
    {
        tittel: 'Søknad',
        tekst: 'Aremark Testfamilien har fått veiledning i å fylle ut søknaden på www.nav.no'
    },
    {
        tittel: 'Saksbehandlingstid',
        tekst:
            'Aremark Testfamilien fått informasjon om å følge med på www.nav.no/saksbehandlingstid for status på behandlingstid på sin søknad.'
    },
    {
        tittel: 'Elektronisk innsending',
        tekst:
            'Aremark Testfamilien får ikke sendt inn opplysninger til NAV elektronisk. Han er anbefalt å se om han finner løsningen på www.nav.no/elektroniskinnsending'
    },
    {
        tittel: 'Vedtak',
        tekst: 'Aremark Testfamilien har fått veiledning i vedtaket sitt.'
    },
    {
        tittel: 'Annet',
        tekst: 'Aremark Testfamilien har fått veiledning om TEMA.'
    }
];
