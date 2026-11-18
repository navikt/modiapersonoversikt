import { type Melding, Meldingstype, type Saksbehandler, type Traad } from 'src/models/meldinger/meldinger';
import { datoSynkende } from 'src/utils/date-utils';

export function nyesteMelding(traad: Traad): Melding {
    return [...traad.meldinger].sort(datoSynkende((melding) => melding.opprettetDato))[0];
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

export function saksbehandlerTekst(saksbehandler?: Saksbehandler) {
    if (!saksbehandler) {
        return 'Ukjent saksbehandler';
    }
    const identOgEnhetTekst = saksbehandler.ident
        ? saksbehandler.enhet
            ? `(${saksbehandler.ident}, ${saksbehandler.enhet})`
            : `(${saksbehandler.ident})`
        : '';
    return `${saksbehandler.fornavn} ${saksbehandler.etternavn} ${identOgEnhetTekst}`;
}
