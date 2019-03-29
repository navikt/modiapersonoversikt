import { Temagruppe } from '../../../../../models/meldinger/meldinger';

export function erSamtalereferat(temagruppe: Temagruppe) {
    return [
        Temagruppe.Arbeid,
        Temagruppe.Familie,
        Temagruppe.Hjelpemiddel,
        Temagruppe.Pensjon,
        Temagruppe.Øvrig,
        Temagruppe.ØkonomiskSosial,
        Temagruppe.AndreSosiale
    ].includes(temagruppe);
}

export function kanLeggesTilbake(temagruppe: Temagruppe) {
    return [
        Temagruppe.Arbeid,
        Temagruppe.Familie,
        Temagruppe.Hjelpemiddel,
        Temagruppe.Bil,
        Temagruppe.OrtopediskHjelpemiddel,
        Temagruppe.PleiepengerBarnsSykdom,
        Temagruppe.Uføretrygd,
        Temagruppe.Utland,
        Temagruppe.ØkonomiskSosial,
        Temagruppe.AndreSosiale
    ].includes(temagruppe);
}

export function erPlukkbar(temagruppe: Temagruppe) {
    return [
        Temagruppe.Arbeid,
        Temagruppe.Familie,
        Temagruppe.Hjelpemiddel,
        Temagruppe.Bil,
        Temagruppe.OrtopediskHjelpemiddel,
        Temagruppe.PleiepengerBarnsSykdom,
        Temagruppe.Uføretrygd,
        Temagruppe.Utland
    ].includes(temagruppe);
}

export function erKommunaleTjenester(temagruppe: Temagruppe) {
    return [Temagruppe.ØkonomiskSosial, Temagruppe.AndreSosiale].includes(temagruppe);
}
