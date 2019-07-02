import { Meldingstype, Temagruppe } from '../../../../../models/meldinger/meldinger';

export function meldingstypeTekst(meldingstype: Meldingstype) {
    switch (meldingstype) {
        case Meldingstype.SVAR_TELEFON:
            return 'Svar telefon';
        case Meldingstype.SPORSMAL_SKRIFTLIG:
            return 'Spørsmål fra bruker';
        case Meldingstype.SAMTALEREFERAT_OPPMOTE:
            return 'Samtalereferat oppmøte';
        case Meldingstype.DelvisSvarSkriftlig:
            return 'Delsvar';
        case Meldingstype.DokumentVarsel:
            return 'Dokument varsel';
        case Meldingstype.OppgaveVarsel:
            return 'OppgaveIkon varsel';
        case Meldingstype.SAMTALEREFERAT_TELEFON:
            return 'Samtalereferat telefon';
        case Meldingstype.SPORSMAL_MODIA_UTGAAENDE:
            return 'Spørsmål fra NAV';
        case Meldingstype.SVAR_OPPMOTE:
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
