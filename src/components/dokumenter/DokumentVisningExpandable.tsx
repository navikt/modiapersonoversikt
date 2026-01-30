import { Tabs } from '@navikt/ds-react';
import { dokumentTekst } from 'src/components/dokumenter/useSortedAndPaginatedDokumenter';
import Dokument from 'src/components/saker/Detail/Dokument';
import { dokumentKanVises } from 'src/components/saker/utils';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';

export const DokumentVisningExpandable = ({
    journalpost,
    isOpen
}: {
    journalpost: Dokumentmetadata;
    isOpen: boolean;
}) => {
    if (!isOpen) {
        return null;
    }

    const hovedDokument = journalpost.hoveddokument;

    const vedleggLength = journalpost.vedlegg.length > 0;
    const tilgangTilHoveddokument = dokumentKanVises(journalpost, hovedDokument);

    return (
        <Tabs defaultValue="hoveddokument">
            <Tabs.List>
                <Tabs.Tab value="hoveddokument" label="Hoveddokument" />
                {vedleggLength &&
                    journalpost.vedlegg.map((vedlegg, i) => {
                        return (
                            <Tabs.Tab
                                key={`${i} + ${vedlegg.dokumentreferanse}`}
                                value={`${i} + ${vedlegg.dokumentreferanse}`}
                                label={dokumentTekst(
                                    vedlegg,
                                    journalpost.id == null || vedlegg.dokumentreferanse == null
                                )}
                            />
                        );
                    })}
            </Tabs.List>
            <Tabs.Panel lazy={true} value="hoveddokument">
                <Dokument journalPost={journalpost} dokument={hovedDokument} kanVises={tilgangTilHoveddokument} />
            </Tabs.Panel>
            {vedleggLength &&
                journalpost.vedlegg.map((vedlegg, i) => {
                    return (
                        <Tabs.Panel
                            key={`${i} + ${vedlegg.dokumentreferanse}`}
                            lazy={true}
                            value={`${i} + ${vedlegg.dokumentreferanse}`}
                        >
                            <Dokument journalPost={journalpost} kanVises={!vedlegg.logiskDokument} dokument={vedlegg} />
                        </Tabs.Panel>
                    );
                })}
        </Tabs>
    );
};
