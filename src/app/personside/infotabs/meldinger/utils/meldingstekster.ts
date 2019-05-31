import { Meldingstype, Temagruppe } from '../../../../../models/meldinger/meldinger';

export function meldingstypeTekst(meldingstype: Meldingstype) {
    switch (meldingstype) {
        case Meldingstype.SvarTelefon:
            return 'Svar telefon';
        case Meldingstype.SpørsmålSkriftlig:
            return 'Spørsmål fra bruker';
        case Meldingstype.SamtalereferatOppmøte:
            return 'Samtalereferat oppmøte';
        case Meldingstype.DelvisSvarSkriftlig:
            return 'Delsvar';
        case Meldingstype.DokumentVarsel:
            return 'DokumentIkon varsel';
        case Meldingstype.OppgaveVarsel:
            return 'OppgaveIkon varsel';
        case Meldingstype.SamtalereferatTelefon:
            return 'Samtalereferat telefon';
        case Meldingstype.SpørsmålModiaUtgående:
            return 'Spørsmål fra NAV';
        case Meldingstype.SvarOppmøte:
            return 'Svar oppmøte';
        case Meldingstype.SvarSblInngående:
            return 'Svar fra bruker';
        case Meldingstype.SvarSkriftlig:
            return 'Svar skriftlig';
        default:
            return 'Ukjent meldingstype';
    }
}

export function temagruppeTekst(temagruppe: Temagruppe) {
    switch (temagruppe) {
        case Temagruppe.Uføretrygd:
            return 'Uføretrygd';
        case Temagruppe.Pensjon:
            return 'Pensjon';
        case Temagruppe.Arbeid:
            return 'Arbeid';
        case Temagruppe.Utland:
            return 'Utland';
        case Temagruppe.PleiepengerBarnsSykdom:
            return 'Pleiepenger barns sykdom';
        case Temagruppe.OrtopediskHjelpemiddel:
            return 'Ortopediske hjelpemiddel';
        case Temagruppe.Bil:
            return 'Bil';
        case Temagruppe.AndreSosiale:
            return 'Andre sosiale henvendelser';
        case Temagruppe.ØkonomiskSosial:
            return 'Økonomisk sosiale henvendelser';
        case Temagruppe.Øvrig:
            return 'Øvrige henvendelser';
        case Temagruppe.Hjelpemiddel:
            return 'Hjelpemiddel';
        case Temagruppe.Familie:
            return 'Familie';
        default:
            return 'Ukjent temagruppe';
    }
}
