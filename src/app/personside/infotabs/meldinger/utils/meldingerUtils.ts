import { Meldingstype, Temagruppe, Traad } from '../../../../../models/meldinger/meldinger';

export function sisteSendteMelding(traad: Traad) {
    return traad.meldinger[0];
}

export function eldsteMelding(traad: Traad) {
    return traad.meldinger[traad.meldinger.length - 1];
}

export function erMonolog(traad: Traad) {
    const bareSaksbehandler: boolean = traad.meldinger.some(melding => erMeldingFraNav(melding.meldingstype));
    const bareBruker: boolean = traad.meldinger.some(melding => erMeldingFraBruker(melding.meldingstype));

    return bareSaksbehandler !== bareBruker;
}

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

export function erMeldingFraBruker(meldingstype: Meldingstype) {
    return [Meldingstype.SpørsmålSkriftlig, Meldingstype.SvarSblInngående].includes(meldingstype);
}

export function erMeldingFraNav(meldingstype: Meldingstype) {
    return [
        Meldingstype.SvarSkriftlig,
        Meldingstype.SvarOppmøte,
        Meldingstype.SvarTelefon,
        Meldingstype.SamtalereferatTelefon,
        Meldingstype.SamtalereferatOppmøte,
        Meldingstype.SpørsmålModiaUtgående,
        Meldingstype.DokumentVarsel,
        Meldingstype.OppgaveVarsel,
        Meldingstype.DelvisSvarSkriftlig
    ].includes(meldingstype);
}

export function erMeldingVarsel(meldingstype: Meldingstype) {
    return [Meldingstype.OppgaveVarsel, Meldingstype.DokumentVarsel].includes(meldingstype);
}

export function erMeldingSpørsmål(meldingstype: Meldingstype) {
    return [Meldingstype.SpørsmålModiaUtgående, Meldingstype.SpørsmålSkriftlig].includes(meldingstype);
}
