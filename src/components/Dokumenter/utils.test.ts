import dayjs from 'dayjs';
import { PeriodType } from 'src/components/DateFilters/types';
import type { DokumenterFilter } from 'src/components/Dokumenter/Filter';
import { filterDokumenter } from 'src/components/Dokumenter/utils';
import {
    type Dokumentmetadata,
    DokumentmetadataAvsender,
    DokumentmetadataMottaker,
    DokumentmetadataRetning
} from 'src/generated/modiapersonoversikt-api';
import { describe, expect, it } from 'vitest';

const lagDokument = (overrides: Partial<Dokumentmetadata> & { id: string }): Dokumentmetadata =>
    ({
        retning: DokumentmetadataRetning.INN,
        dato: '2024-01-15T12:00:00',
        navn: 'Dokumentnavn',
        journalpostId: `jp-${overrides.id}`,
        vedlegg: [],
        avsender: DokumentmetadataAvsender.SLUTTBRUKER,
        mottaker: DokumentmetadataMottaker.NAV,
        tilhorendeSaksid: 'sak-1',
        tilhorendeFagsaksid: 'fagsak-1',
        baksystem: [],
        temakode: 'DAG',
        temakodeVisning: 'Dagpenger',
        ettersending: false,
        erJournalfort: true,
        ...overrides
    }) as Dokumentmetadata;

const tomtFilter: DokumenterFilter = {
    dateRange: null,
    periodType: PeriodType.UNSET,
    temaer: [],
    avsendere: [],
    saksId: ''
};

const fraBruker = lagDokument({ id: '1', avsender: DokumentmetadataAvsender.SLUTTBRUKER });
const fraNav = lagDokument({ id: '2', avsender: DokumentmetadataAvsender.NAV });
const fraEkstern = lagDokument({ id: '3', avsender: DokumentmetadataAvsender.EKSTERN_PART });
const alleDokumenter = [fraBruker, fraNav, fraEkstern];

const idene = (dokumenter: Dokumentmetadata[]) => dokumenter.map((dok) => dok.id);

describe('filterDokumenter - avsender', () => {
    it('filtrerer på én avsender', () => {
        const resultat = filterDokumenter(alleDokumenter, {
            ...tomtFilter,
            avsendere: [DokumentmetadataAvsender.NAV]
        });

        expect(idene(resultat)).toEqual(['2']);
    });

    it('inkluderer dokumenter fra alle valgte avsendere', () => {
        const resultat = filterDokumenter(alleDokumenter, {
            ...tomtFilter,
            avsendere: [DokumentmetadataAvsender.NAV, DokumentmetadataAvsender.EKSTERN_PART]
        });

        expect(idene(resultat)).toEqual(['2', '3']);
    });

    it('beholder alle dokumenter når ingen avsender er valgt', () => {
        const resultat = filterDokumenter(alleDokumenter, tomtFilter);

        expect(idene(resultat)).toEqual(['1', '2', '3']);
    });

    it('gir tom liste når ingen dokumenter har valgt avsender', () => {
        const resultat = filterDokumenter(alleDokumenter, {
            ...tomtFilter,
            avsendere: [DokumentmetadataAvsender.UKJENT]
        });

        expect(resultat).toEqual([]);
    });

    it('kombinerer avsender med tema og datoperiode', () => {
        const dokumenter = [
            lagDokument({
                id: 'treff',
                avsender: DokumentmetadataAvsender.NAV,
                temakode: 'DAG',
                dato: '2024-03-10T12:00:00'
            }),
            lagDokument({
                id: 'feil-avsender',
                avsender: DokumentmetadataAvsender.SLUTTBRUKER,
                temakode: 'DAG',
                dato: '2024-03-10T12:00:00'
            }),
            lagDokument({
                id: 'feil-tema',
                avsender: DokumentmetadataAvsender.NAV,
                temakode: 'SYK',
                dato: '2024-03-10T12:00:00'
            }),
            lagDokument({
                id: 'utenfor-periode',
                avsender: DokumentmetadataAvsender.NAV,
                temakode: 'DAG',
                dato: '2023-01-01T12:00:00'
            })
        ];

        const resultat = filterDokumenter(dokumenter, {
            ...tomtFilter,
            avsendere: [DokumentmetadataAvsender.NAV],
            temaer: ['DAG'],
            dateRange: { from: dayjs('2024-01-01'), to: dayjs('2024-12-31') }
        });

        expect(idene(resultat)).toEqual(['treff']);
    });
});
