import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
    type Melding,
    Meldingstype,
    type Traad,
    TraadDTOTraadType,
    type Veileder
} from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { datoStigende, datoSynkende, formatterDatoTid } from 'src/utils/date-utils';
import type { MeldingerFilter } from './Filter';
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

export function meldingstittel(melding: Melding): string {
    if (melding.temagruppe === Temagruppe.InnholdSlettet) {
        return meldingstypeTekst(melding.meldingstype);
    }
    return `${meldingstypeTekst(melding.meldingstype)} - ${temagruppeTekst(melding.temagruppe as Temagruppe)}`;
}

function erMeldingFraBruker(meldingstype: Meldingstype) {
    return [
        Meldingstype.SPORSMAL_SKRIFTLIG,
        Meldingstype.SVAR_SBL_INNGAAENDE,
        Meldingstype.CHATMELDING_FRA_BRUKER
    ].includes(meldingstype);
}

export function traadstittel(traad: Traad): string {
    const infoMelding = traadErInfoMelding(traad);
    return traadTypeTekst(infoMelding, traad.traadType);
}

export function erMeldingstypeSamtalereferat(meldingstype: Meldingstype) {
    return [Meldingstype.SAMTALEREFERAT_OPPMOTE, Meldingstype.SAMTALEREFERAT_TELEFON].includes(meldingstype);
}

function erChatMelding(meldingstype: Meldingstype): boolean {
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

export function kanTraadJournalforesV2(traad: Traad): boolean {
    return !erFeilsendt(traad);
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

export function saksbehandlerTekst(saksbehandler?: Veileder) {
    if (!saksbehandler) {
        return 'Ukjent saksbehandler';
    }
    const identTekst = saksbehandler.ident ? `(${saksbehandler.ident})` : '';
    return `${saksbehandler.navn} ${identTekst}`;
}

export function getFormattertMeldingsDato(melding: Melding) {
    return formatterDatoTid(melding?.ferdigstiltDato || melding.opprettetDato);
}

interface TraadSearchDb {
    traad: Traad;
    searchable: string;
}
export function useFilterMeldinger(traader: Traad[], filters: MeldingerFilter) {
    const database: Array<TraadSearchDb> = useMemo(() => {
        return traader.map((traad) => {
            const searchable = traad.meldinger
                .map((melding) => {
                    const fritekst = melding.fritekst;
                    const tittel = meldingstittel(melding);
                    const saksbehandler = melding.skrevetAvTekst;
                    const datotekst = getFormattertMeldingsDato(melding);
                    return (fritekst + tittel + saksbehandler + datotekst).toLowerCase();
                })
                .join('||');

            return { traad, searchable };
        });
    }, [traader]);

    const query = filters.search;
    const temaGrupper = filters.tema;
    const traadType = filters.traadType;
    const dateRange = filters.dateRange;

    const searched = useMemo(() => {
        if (!query) return database.map((t) => t.traad);
        const words = query.split(' ').map((word) => word.toLowerCase());
        return database
            .filter(({ searchable }) => {
                return words.every((word) => searchable.includes(word));
            })
            .map(({ traad }) => traad)
            .sort(datoSynkende((traad) => nyesteMelding(traad).opprettetDato));
    }, [query, database]);

    const filteredByTema = useMemo(() => {
        if (!temaGrupper || !temaGrupper.length) return searched;

        return searched.filter((t) => temaGrupper.includes(t.temagruppe as Temagruppe));
    }, [searched, temaGrupper]);

    const filteredByType = useMemo(() => {
        return filteredByTema.filter((t) => traadType?.includes(t.traadType));
    }, [filteredByTema, traadType]);

    const filteredByDate = useMemo(() => {
        if (!dateRange) return filteredByType;
        return filteredByType.filter((t) => {
            const lastMsg = dayjs(nyesteMelding(t).opprettetDato);
            return lastMsg.isAfter(dateRange.from) && lastMsg.isBefore(dateRange.to);
        });
    }, [filteredByType, dateRange]);

    return filteredByDate;
}
