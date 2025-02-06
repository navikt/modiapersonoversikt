import { type Melding, Meldingstype, type Traad, TraadDTOTraadType } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { datoStigende, datoSynkende, formatterDatoTid } from 'src/utils/date-utils';
import { meldingstypeTekst, traadTypeTekst } from './tekster';

/*
   Teknisk sett kan `nyesteMelding` og `eldsteMelding` returnerer undefined.
   Men en tråd uten noen meldinger skal ikke forekomme, så vi kan da kaste feil.

   Er eksplisitt for `nyesteTraad` siden bruker ikke nødvendigvis har tidligere tråder
 */
export function nyesteMelding(traad: Traad): Melding {
    return [...traad.meldinger].sort(datoSynkende((melding) => melding.opprettetDato))[0];
}

export function eldsteMelding(traad: Traad): Melding {
    return [...traad.meldinger].sort(datoStigende((melding) => melding.opprettetDato))[0];
}

export function nyesteTraad(traader: Traad[]): Traad | undefined {
    return traader.sort(datoSynkende((traad) => nyesteMelding(traad).opprettetDato))[0];
}

export function kanBesvares(traad?: Traad): boolean {
    if (!traad) {
        return false;
    }
    const melding = eldsteMelding(traad);

    if (erMeldingstypeSamtalereferat(melding.meldingstype)) {
        return true;
    }
    /**
     * For meldingskjeder i salesforce er det kun mulig å sende oppfølgingsmeldinger
     * før tråden blir avsluttet. På dette tidspunktet vil tråden bli journalført og låst.
     */
    return !melding.avsluttetDato;
}

export function traadKanBesvares(traad?: Traad): boolean {
    if (!traad) {
        return false;
    }

    if (traad.traadType === TraadDTOTraadType.CHAT) {
        return false;
    }

    if (traad.traadType === TraadDTOTraadType.SAMTALEREFERAT) {
        return true;
    }
    const melding = eldsteMelding(traad);
    return !traad.avsluttetDato || !melding.avsluttetDato;
}

function traadErInfoMelding(traad: Traad): boolean {
    const melding = eldsteMelding(traad);
    return traad.meldinger.length === 1 && !!melding.avsluttetDato;
}

export function erMonolog(traad: Traad) {
    const bareSaksbehandler: boolean = traad.meldinger.some((melding) => erMeldingFraNav(melding.meldingstype));
    const bareBruker: boolean = traad.meldinger.some((melding) => erMeldingFraBruker(melding.meldingstype));

    return bareSaksbehandler !== bareBruker;
}

export function meldingstittel(melding: Melding): string {
    if (melding.temagruppe === Temagruppe.InnholdSlettet) {
        return meldingstypeTekst(melding.meldingstype);
    }
    return `${meldingstypeTekst(melding.meldingstype)} - ${temagruppeTekst(melding.temagruppe as Temagruppe)}`;
}

export function traadstittel(traad: Traad): string {
    const infoMelding = traadErInfoMelding(traad);
    return traadTypeTekst(infoMelding, traad.traadType);
}

export function erMeldingstypeSamtalereferat(meldingstype: Meldingstype) {
    return [Meldingstype.SAMTALEREFERAT_OPPMOTE, Meldingstype.SAMTALEREFERAT_TELEFON].includes(meldingstype);
}

export function erMeldingFraBruker(meldingstype: Meldingstype) {
    return [
        Meldingstype.SPORSMAL_SKRIFTLIG,
        Meldingstype.SVAR_SBL_INNGAAENDE,
        Meldingstype.CHATMELDING_FRA_BRUKER
    ].includes(meldingstype);
}

export function erChatMelding(meldingstype: Meldingstype): boolean {
    return [Meldingstype.CHATMELDING_FRA_BRUKER, Meldingstype.CHATMELDING_FRA_NAV].includes(meldingstype);
}

export function erChatTraad(traad: Traad): boolean {
    return erChatMelding(nyesteMelding(traad).meldingstype);
}

export function erUbesvartHenvendelseFraBruker(traad: Traad): boolean {
    if (traad.meldinger.length > 1) {
        return false;
    }
    const melding = traad.meldinger[0];
    if (!erMeldingFraBruker(melding.meldingstype)) {
        return false;
    }

    return !melding.avsluttetDato;
}

export function erMeldingFraNav(meldingstype: Meldingstype) {
    return [
        Meldingstype.SVAR_SKRIFTLIG,
        Meldingstype.SAMTALEREFERAT_TELEFON,
        Meldingstype.SAMTALEREFERAT_OPPMOTE,
        Meldingstype.SPORSMAL_MODIA_UTGAAENDE,
        Meldingstype.INFOMELDING_MODIA_UTGAAENDE,
        Meldingstype.CHATMELDING_FRA_NAV
    ].includes(meldingstype);
}

export function erKontorsperret(traad: Traad): boolean {
    return !!eldsteMelding(traad).kontorsperretEnhet;
}

export function kanTraadJournalforesV2(traad: Traad): boolean {
    return !erKontorsperret(traad) && !erFeilsendt(traad);
}

export function kanTraadJournalfores(traad: Traad): boolean {
    return !erKontorsperret(traad) && !erFeilsendt(traad) && erBehandlet(traad);
}

export function erJournalfort(traad: Traad): boolean {
    return traad.journalposter.isNotEmpty();
}

export function erFeilsendt(traad: Traad): boolean {
    return !!eldsteMelding(traad).markertSomFeilsendtAv;
}

export function erMeldingFeilsendt(melding: Melding): boolean {
    return !!melding.markertSomFeilsendtAv;
}

export function erBehandlet(traad: Traad): boolean {
    return traad.meldinger.some((melding) => erMeldingFraNav(melding.meldingstype));
}

export function saksbehandlerTekst(saksbehandler?: Saksbehandler) {
    if (!saksbehandler) {
        return 'Ukjent saksbehandler';
    }
    const identTekst = saksbehandler.ident ? `(${saksbehandler.ident})` : '';
    return `${saksbehandler.fornavn} ${saksbehandler.etternavn} ${identTekst}`;
}

export function getFormattertMeldingsDato(melding: Melding) {
    return formatterDatoTid(melding?.ferdigstiltDato || melding.opprettetDato);
}
