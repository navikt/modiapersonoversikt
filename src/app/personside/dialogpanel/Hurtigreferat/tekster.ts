export interface Hurtigreferat {
    tittel: string;
    fritekst: string;
}

export type Hurtigreferater = Hurtigreferat[];

export const tekster: Hurtigreferater = [
    {
        tittel: 'Generell informasjon',
        fritekst:
            '[bruker.navn] har fått generell informasjon om NAVs tjenester og ytelser, og du finner mer informasjon om dette på www.nav.no'
    },
    {
        tittel: 'Veiledet www.nav.no',
        fritekst: '[bruker.navn] er blitt veiledet i bruk av www.nav.no'
    },
    {
        tittel: 'Utbetaling',
        fritekst:
            '[bruker.navn] har informasjon om å følge med på www.nav.no/utbetaling for informasjon og status om utbetalingen sin.'
    },
    {
        tittel: 'Skatt',
        fritekst: `[bruker.navn] har spørsmål om skattetrekk.
Du har fått informasjon om at:
- vi har brukt skattetrekket som vi har fått overført fra skatteetaten
- hvis du mener skattetrekket er feil må du endre skattekortet selv på www.skatteetaten.no
Du har også fått informasjon om at du kan lese mer på https://www.nav.no/skatt`
    },
    {
        tittel: 'Søknad',
        fritekst: '[bruker.navn] har fått veiledning i å fylle ut søknaden på www.nav.no'
    },
    {
        tittel: 'Saksbehandlingstid',
        fritekst:
            '[bruker.navn] fått informasjon om å følge med på www.nav.no/saksbehandlingstid for status på behandlingstid på sin søknad.'
    },
    {
        tittel: 'Elektronisk innsending',
        fritekst:
            '[bruker.navn] får ikke sendt inn opplysninger til NAV elektronisk. Han er anbefalt å se om han finner løsningen på www.nav.no/elektroniskinnsending'
    },
    {
        tittel: 'Vedtak',
        fritekst: '[bruker.navn] har fått veiledning i vedtaket sitt.'
    },
    {
        tittel: 'Ubesvart anrop',
        fritekst:
            '[bruker.navn] har et ubesvart anrop fra NAV. Du blir kontaktet på nytt dersom NAV ønsker å gi eller innhente informasjon fra deg.'
    },
    {
        tittel: 'Tekniske problemer',
        fritekst:
            '[bruker.navn] har opplevd tekniske problemer med nav.no, og har fått veiledning på hvordan dette kan løses. Problemet er nå løst.'
    }
];
