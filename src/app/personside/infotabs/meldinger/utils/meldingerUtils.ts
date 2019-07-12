import { Melding, Meldingstype, Temagruppe, Traad } from '../../../../../models/meldinger/meldinger';

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

export function erKontorsperret(traad: Traad): boolean {
    return !!eldsteMelding(traad).kontorsperretEnhet;
}

export function erEldsteMeldingJournalfort(traad: Traad): boolean {
    return !!eldsteMelding(traad).journalfortDato;
}

export function erFeilsendt(traad: Traad): boolean {
    return !!eldsteMelding(traad).markertSomFeilsendtAv;
}

export function erMeldingFeilsendt(melding: Melding): boolean {
    return !!melding.markertSomFeilsendtAv;
}

export function erBehandlet(traad: Traad): boolean {
    const minstEnMeldingErFraNav: boolean = traad.meldinger.some(melding => erMeldingFraNav(melding.meldingstype));
    const erFerdigstiltUtenSvar: boolean = eldsteMelding(traad).erFerdigstiltUtenSvar;

    return minstEnMeldingErFraNav || erFerdigstiltUtenSvar;
}

export function harDelsvar(traad: Traad): boolean {
    return traad.meldinger.some(melding => melding.erDelsvar);
}

export function harTilgangTilSletting() {
    // TODO Fiks når vi har satt opp vault/fasit
    return true;
}
