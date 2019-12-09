export enum Temagruppe {
    Arbeid = 'ARBD',
    Familie = 'FMLI',
    Hjelpemiddel = 'HJLPM',
    Bil = 'BIL',
    OrtopediskHjelpemiddel = 'ORT_HJE',
    Øvrig = 'OVRG',
    Pensjon = 'PENS',
    PleiepengerSyktBarn = 'PLEIEPENGERSY',
    Uføretrygd = 'UFRT',
    Utland = 'UTLAND',
    AndreSosiale = 'ANSOS',
    ØkonomiskSosial = 'OKSOS',
    InnholdSlettet = '' // Dette er en hack fra baksystemene. Man har der valgt å sette temagruppe til tom string for å vise at innholdet i meldingen har blitt slettet
}

export const TemaSamtalereferat = [
    Temagruppe.Arbeid,
    Temagruppe.Familie,
    Temagruppe.Hjelpemiddel,
    Temagruppe.Pensjon,
    Temagruppe.Øvrig
];

export const TemaPlukkbare = [
    Temagruppe.Arbeid,
    Temagruppe.Familie,
    Temagruppe.Hjelpemiddel,
    Temagruppe.Bil,
    Temagruppe.OrtopediskHjelpemiddel,
    Temagruppe.Pensjon,
    Temagruppe.PleiepengerSyktBarn,
    Temagruppe.Uføretrygd,
    Temagruppe.Utland
];

export const TemaKommunaleTjenester = [Temagruppe.AndreSosiale, Temagruppe.ØkonomiskSosial];

export function temagruppeTekst(temagruppe: Temagruppe | null) {
    switch (temagruppe) {
        case Temagruppe.Uføretrygd:
            return 'Uføretrygd';
        case Temagruppe.Pensjon:
            return 'Pensjon';
        case Temagruppe.Arbeid:
            return 'Arbeid';
        case Temagruppe.Utland:
            return 'Utland';
        case Temagruppe.PleiepengerSyktBarn:
            return 'Pleiepenger sykt barn';
        case Temagruppe.OrtopediskHjelpemiddel:
            return 'Ortopediske hjelpemidler';
        case Temagruppe.Bil:
            return 'Hjelpemidler bil';
        case Temagruppe.AndreSosiale:
            return 'Andre sosiale tjenester';
        case Temagruppe.ØkonomiskSosial:
            return 'Økonomisk sosialhjelp';
        case Temagruppe.Øvrig:
            return 'Øvrige henvendelser';
        case Temagruppe.Hjelpemiddel:
            return 'Hjelpemidler';
        case Temagruppe.Familie:
            return 'Familie';
        case Temagruppe.InnholdSlettet:
            return 'Innhold slettet';
        case null:
            return 'Ingen temagruppe';
        default:
            return 'Ukjent temagruppe: ' + temagruppe;
    }
}
