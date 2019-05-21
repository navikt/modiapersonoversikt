export interface Hurtigreferat {
    tittel: string;
    fritekst: string;
}

export type Hurtigreferater = Hurtigreferat[];

export const tekster: Hurtigreferater = [
    {
        tittel: 'Henvist www.nav.no',
        fritekst: 'BRUKER er henvist til informasjon på www.nav.no'
    },
    {
        tittel: 'Veiledet www.nav.no (skjermdeling)',
        fritekst: 'BRUKER er blitt veiledet i bruk av www.nav.no'
    },
    {
        tittel: 'Generell informasjon',
        fritekst:
            'BRUKER har fått generell informasjon om NAVs tjenester og ytelser, og er henvist til mer informasjon på www.nav.no.'
    },
    {
        tittel: 'Utbetaling',
        fritekst:
            'BRUKER har informasjon om å følge med på www.nav.no/utbetaling for informasjon og status om utbetalingen sin.'
    },
    {
        tittel: 'Skatt',
        fritekst: `BRUKER har spørsmål om skattetrekk.
Du har fått informasjon om at:
- vi har brukt skattetrekket som vi har fått overført fra skatteetaten
- hvis du mener skattetrekket er feil må du endre skattekortet selv på www.skatteetaten.no
Du har også fått informasjon om at du kan lese mer på http://www.nav.no/skatt`
    },
    {
        tittel: 'Søknad',
        fritekst: 'BRUKER har fått veiledning i å fylle ut søknaden på www.nav.no'
    },
    {
        tittel: 'Saksbehandlingstid',
        fritekst:
            'BRUKER fått informasjon om å følge med på www.nav.no/saksbehandlingstid for status på behandlingstid på sin søknad.'
    },
    {
        tittel: 'Elektronisk innsending',
        fritekst:
            'BRUKER får ikke sendt inn opplysninger til NAV elektronisk. Han er anbefalt å se om han finner løsningen på www.nav.no/elektroniskinnsending'
    },
    {
        tittel: 'Vedtak',
        fritekst: 'BRUKER har fått veiledning i vedtaket sitt.'
    },
    {
        tittel: 'Annet',
        fritekst: 'BRUKER har fått veiledning om TEMA.'
    }
];
