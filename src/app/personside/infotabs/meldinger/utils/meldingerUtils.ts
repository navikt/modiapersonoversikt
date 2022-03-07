import { Melding, Meldingstype, Saksbehandler, Traad } from '../../../../../models/meldinger/meldinger';
import { meldingstypeTekst } from './meldingstekster';
import { datoStigende, datoSynkende, formatterDatoTid } from '../../../../../utils/date-utils';
import { useMemo } from 'react';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import { Temagruppe, temagruppeTekst } from '../../../../../models/temagrupper';

export function nyesteMelding(traad: Traad) {
    return [...traad.meldinger].sort(datoSynkende((melding) => melding.opprettetDato))[0];
}

export function eldsteMelding(traad: Traad) {
    return [...traad.meldinger].sort(datoStigende((melding) => melding.opprettetDato))[0];
}

export function kanBesvares(traad?: Traad): boolean {
    if (!traad) {
        return false;
    }
    const melding = eldsteMelding(traad);

    if (erMeldingstypeSamtalereferat(melding.meldingstype)) {
        return true;
    } else {
        /**
         * For meldingskjeder i salesforce er det kun mulig å sende oppfølgingsmeldinger
         * før tråden blir avsluttet. På dette tidspunktet vil tråden bli journalført og låst.
         */
        return !melding.avsluttetDato;
    }
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
    return `${meldingstypeTekst(melding.meldingstype)} - ${temagruppeTekst(melding.temagruppe)}`;
}

export function erMeldingstypeSamtalereferat(meldingstype: Meldingstype) {
    return [Meldingstype.SAMTALEREFERAT_OPPMOTE, Meldingstype.SAMTALEREFERAT_TELEFON].includes(meldingstype);
}

export function erMeldingFraBruker(meldingstype: Meldingstype) {
    return [Meldingstype.SPORSMAL_SKRIFTLIG, Meldingstype.SVAR_SBL_INNGAAENDE].includes(meldingstype);
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
        Meldingstype.INFOMELDING_MODIA_UTGAAENDE
    ].includes(meldingstype);
}

export function erKontorsperret(traad: Traad): boolean {
    return !!eldsteMelding(traad).kontorsperretEnhet;
}

export function kanTraadJournalfores(traad: Traad): boolean {
    const nyesteMeldingITraad = nyesteMelding(traad);
    return !erKontorsperret(traad) && !erFeilsendt(traad) && !erJournalfort(nyesteMeldingITraad) && erBehandlet(traad);
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
    return traad.meldinger.some((melding) => erMeldingFraNav(melding.meldingstype));
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
            .filter((traad) => {
                return traad.meldinger.some((melding) => {
                    const fritekst = melding.fritekst;
                    const tittel = meldingstittel(melding);
                    const saksbehandler = melding.skrevetAvTekst;
                    const datotekst = getFormattertMeldingsDato(melding);
                    const sokbarTekst = (fritekst + tittel + saksbehandler + datotekst).toLowerCase();
                    return words.every((word) => sokbarTekst.includes(word.toLowerCase()));
                });
            })
            .sort(datoSynkende((traad) => nyesteMelding(traad).opprettetDato));
    }, [debouncedQuery, traader]);
}

export function nyesteTraad(traader: Traad[]) {
    return traader.sort(datoSynkende((traad) => nyesteMelding(traad).opprettetDato))[0];
}

function removeWhiteSpaces(text: string) {
    return text.replace(/\s+/g, '');
}

export function erSammefritekstSomIMelding(fritekst: string, melding: Melding): boolean {
    const fritekstFraNyesteMeldingITraad = removeWhiteSpaces(melding.fritekst.toLowerCase());
    const fritekstFraMelding = removeWhiteSpaces(fritekst.toLowerCase());
    return fritekstFraNyesteMeldingITraad.includes(fritekstFraMelding);
}

export function getFormattertMeldingsDato(melding: Melding) {
    return formatterDatoTid(melding?.ferdigstiltDato || melding.opprettetDato);
}
