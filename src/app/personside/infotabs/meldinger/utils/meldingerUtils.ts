import { Melding, Meldingstype, Saksbehandler, Traad } from '../../../../../models/meldinger/meldinger';
import { meldingstypeTekst } from './meldingstekster';
import { datoStigende, datoSynkende, formatterDatoTid } from '../../../../../utils/dateUtils';
import { useMemo } from 'react';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import { Temagruppe, temagruppeTekst, TemaKommunaleTjenester, TemaPlukkbare } from '../../../../../models/Temagrupper';

export function nyesteMelding(traad: Traad) {
    return [...traad.meldinger].sort(datoSynkende(melding => melding.opprettetDato))[0];
}

export function eldsteMelding(traad: Traad) {
    return [...traad.meldinger].sort(datoStigende(melding => melding.opprettetDato))[0];
}

export function erMonolog(traad: Traad) {
    const bareSaksbehandler: boolean = traad.meldinger.some(melding => erMeldingFraNav(melding.meldingstype));
    const bareBruker: boolean = traad.meldinger.some(melding => erMeldingFraBruker(melding.meldingstype));

    return bareSaksbehandler !== bareBruker;
}

export function meldingstittel(melding: Melding): string {
    if ([Meldingstype.DOKUMENT_VARSEL, Meldingstype.OPPGAVE_VARSEL].includes(melding.meldingstype)) {
        return melding.statusTekst || meldingstypeTekst(melding.meldingstype);
    }
    if (melding.temagruppe === Temagruppe.InnholdSlettet) {
        return meldingstypeTekst(melding.meldingstype);
    }
    return `${meldingstypeTekst(melding.meldingstype)} - ${temagruppeTekst(melding.temagruppe)}`;
}

export function erMeldingstypeSamtalereferat(meldingstype: Meldingstype) {
    return [Meldingstype.SAMTALEREFERAT_OPPMOTE, Meldingstype.SAMTALEREFERAT_TELEFON].includes(meldingstype);
}

export function kanLeggesTilbake(temagruppe: Temagruppe) {
    return TemaPlukkbare.includes(temagruppe);
}

export function erPlukkbar(temagruppe: Temagruppe) {
    return TemaPlukkbare.includes(temagruppe);
}

export function erKommunaleTjenester(temagruppe: Temagruppe | null) {
    if (!temagruppe) {
        return false;
    }
    return TemaKommunaleTjenester.includes(temagruppe);
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

export function erKontorsperret(traad: Traad): boolean {
    return !!eldsteMelding(traad).kontorsperretEnhet;
}
export function kanTraadJournalfores(traad: Traad): boolean {
    const nyesteMeldingITraad = nyesteMelding(traad);
    return (
        !erMeldingVarsel(nyesteMeldingITraad.meldingstype) &&
        !erKontorsperret(traad) &&
        !erFeilsendt(traad) &&
        !erJournalfort(nyesteMeldingITraad) &&
        erBehandlet(traad) &&
        !erDelsvar(nyesteMeldingITraad)
    );
}

export function erEldsteMeldingJournalfort(traad: Traad): boolean {
    return erJournalfort(eldsteMelding(traad));
}

export function erJournalfort(melding: Melding) {
    return !!melding.journalfortDato;
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

export function erDelsvar(melding: Melding): boolean {
    return melding.meldingstype === Meldingstype.DELVIS_SVAR_SKRIFTLIG;
}

export function harDelsvar(traad: Traad): boolean {
    return traad.meldinger.some(erDelsvar);
}

export function erDelvisBesvart(traad: Traad): boolean {
    return erDelsvar(nyesteMelding(traad));
}

export function saksbehandlerTekst(saksbehandler?: Saksbehandler) {
    if (!saksbehandler) {
        return 'Ukjent saksbehandler';
    }
    const identTekst = saksbehandler.ident ? `(${saksbehandler.ident})` : '';
    return `${saksbehandler.fornavn} ${saksbehandler.etternavn} ${identTekst}`;
}

export function useSokEtterMeldinger(traader: Traad[], query: string) {
    const debouncedQuery = useDebounce(query, 200);
    return useMemo(() => {
        const words = debouncedQuery.split(' ');
        return traader
            .filter(traad => {
                return traad.meldinger.some(melding => {
                    const fritekst = melding.fritekst;
                    const tittel = meldingstittel(melding);
                    const saksbehandler = melding.skrevetAvTekst;
                    const datotekst = formatterDatoTid(melding.opprettetDato);
                    const sokbarTekst = (fritekst + tittel + saksbehandler + datotekst).toLowerCase();
                    return words.every(word => sokbarTekst.includes(word.toLowerCase()));
                });
            })
            .sort(datoSynkende(traad => nyesteMelding(traad).opprettetDato));
    }, [debouncedQuery, traader]);
}

export function filtrerBortVarsel(traad: Traad): boolean {
    return ![Meldingstype.DOKUMENT_VARSEL, Meldingstype.OPPGAVE_VARSEL].includes(nyesteMelding(traad).meldingstype);
}
