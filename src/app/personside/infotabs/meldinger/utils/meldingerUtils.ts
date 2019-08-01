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
    return [Meldingstype.SPORSMAL_SKRIFTLIG, Meldingstype.SvarSblInngående].includes(meldingstype);
}

export function erMeldingFraNav(meldingstype: Meldingstype) {
    return [
        Meldingstype.SVAR_SKRIFTLIG,
        Meldingstype.SVAR_OPPMOTE,
        Meldingstype.SVAR_TELEFON,
        Meldingstype.SAMTALEREFERAT_TELEFON,
        Meldingstype.SAMTALEREFERAT_OPPMOTE,
        Meldingstype.SPORSMAL_MODIA_UTGAAENDE,
        Meldingstype.DOKUMENT_VARSEL,
        Meldingstype.OPPGAVE_VARSEL,
        Meldingstype.DELVIS_SVAR_SKRIFTLIG
    ].includes(meldingstype);
}

export function erMeldingVarsel(meldingstype: Meldingstype) {
    return [Meldingstype.OPPGAVE_VARSEL, Meldingstype.DOKUMENT_VARSEL].includes(meldingstype);
}

export function erMeldingSpørsmål(meldingstype: Meldingstype) {
    return [Meldingstype.SPORSMAL_MODIA_UTGAAENDE, Meldingstype.SPORSMAL_SKRIFTLIG].includes(meldingstype);
}
