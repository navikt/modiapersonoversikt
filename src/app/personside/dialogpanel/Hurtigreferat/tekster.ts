export interface Tekst {
    tittel: string;
    fritekst: string;
}

export type ITekster = Tekst[];

export const tekster: ITekster = [
    {
        tittel: 'Henvist www.nav.no',
        fritekst: 'Aremark Testfamilien er henvist til informasjon på www.nav.no'
    },
    {
        tittel: 'Veiledet www.nav.no (skjermdeling)',
        fritekst: 'Aremark Testfamilien er blitt veiledet i bruk av www.nav.no'
    },
    {
        tittel: 'Generell informasjon',
        fritekst:
            'Aremark Testfamilien har fått generell informasjon om NAVs tjenester og ytelser, og er henvist til mer informasjon på www.nav.no.'
    },
    {
        tittel: 'Utbetaling',
        fritekst:
            'Aremark Testfamilien har informasjon om å følge med på www.nav.no/utbetaling for informasjon og status om utbetalingen sin.'
    },
    {
        tittel: 'Skatt',
        fritekst: `Aremark Testfamilien har spørsmål om skattetrekk.
Du har fått informasjon om at:
- vi har brukt skattetrekket som vi har fått overført fra skatteetaten
- hvis du mener skattetrekket er feil må du endre skattekortet selv på www.skatteetaten.no
Du har også fått informasjon om at du kan lese mer på http://www.nav.no/skatt`
    },
    {
        tittel: 'Søknad',
        fritekst: 'Aremark Testfamilien har fått veiledning i å fylle ut søknaden på www.nav.no'
    },
    {
        tittel: 'Saksbehandlingstid',
        fritekst:
            'Aremark Testfamilien fått informasjon om å følge med på www.nav.no/saksbehandlingstid for status på behandlingstid på sin søknad.'
    },
    {
        tittel: 'Elektronisk innsending',
        fritekst:
            'Aremark Testfamilien får ikke sendt inn opplysninger til NAV elektronisk. Han er anbefalt å se om han finner løsningen på www.nav.no/elektroniskinnsending'
    },
    {
        tittel: 'Vedtak',
        fritekst: 'Aremark Testfamilien har fått veiledning i vedtaket sitt.'
    },
    {
        tittel: 'Annet',
        fritekst: 'Aremark Testfamilien har fått veiledning om TEMA.'
    }
];
