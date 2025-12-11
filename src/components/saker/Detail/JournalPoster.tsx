import { Accordion, Alert, BodyShort, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Dokument from 'src/components/saker/Detail/Dokument';
import JournalPostVedlegg from 'src/components/saker/Detail/JournalPostVedlegg';
import { dokumentKanVises, tekstBasertPaRetning } from 'src/components/saker/utils';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import { trackAccordionClosed, trackAccordionOpened } from 'src/utils/analytics';
import { formatterDatoTid } from 'src/utils/date-utils';
import { datoEllerNull } from 'src/utils/string-utils';

const JournalPoster = ({
    journalPoster,
    brukersNavn,
    columns
}: { journalPoster: Dokumentmetadata[]; brukersNavn: string; columns?: number }) => {
    const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});

    if (journalPoster.length === 0) {
        return <Alert variant="info">Valgte sak har ikke dokumenter.</Alert>;
    }

    const getDokumentEntries = (journalPost: Dokumentmetadata, dokument: Dokument) => {
        return {
            Dato: datoEllerNull(journalPost.dato),
            JournalpostId: journalPost.journalpostId,
            Avsender: journalPost.avsender,
            Mottaker: journalPost.mottaker,
            Status: dokument.dokumentStatus,
            Lestdato: journalPost.lestDato ? formatterDatoTid(new Date(journalPost.lestDato)) : 'Ikke lest',
            Vedlegg: journalPost.vedlegg.length ? `${journalPost.vedlegg.length} vedlegg` : 'Ingen vedlegg'
        };
    };

    const handleOnExpand = (id: string, isOpen: boolean) => {
        setOpenMap({
            ...openMap,
            [id]: isOpen
        });
        isOpen ? trackAccordionOpened('dokumentvisning') : trackAccordionClosed('dokumentvisning');
    };

    return (
        <VStack gap="2">
            <Accordion size="small">
                {journalPoster.map((journalPost) => {
                    const hovedDokument = journalPost.hoveddokument;
                    const vedleggLength = journalPost.vedlegg.length > 0;
                    const tilgangTilHoveddokument = dokumentKanVises(journalPost, hovedDokument);
                    const isOpen = openMap[journalPost.id] ?? false;
                    return (
                        <Accordion.Item
                            key={journalPost.id}
                            open={isOpen}
                            onOpenChange={() => handleOnExpand(journalPost.id, !isOpen)}
                        >
                            <Accordion.Header>
                                <VStack gap="2">
                                    <BodyShort size="small" weight="semibold">
                                        {tekstBasertPaRetning(brukersNavn, journalPost)} (
                                        {datoEllerNull(journalPost.dato)})
                                    </BodyShort>
                                    <BodyShort size="small"> {hovedDokument.tittel}</BodyShort>
                                </VStack>
                            </Accordion.Header>
                            <Accordion.Content>
                                {isOpen && (
                                    <VStack gap="4" flexGrow="1" overflow="auto">
                                        <TitleValuePairsComponent
                                            entries={getDokumentEntries(journalPost, hovedDokument)}
                                            columns={columns}
                                        />
                                        <Tabs defaultValue="hoveddokument">
                                            <Tabs.List>
                                                <Tabs.Tab value="hoveddokument" label="Hoveddokument" />
                                                {vedleggLength && <Tabs.Tab value="vedlegg" label="Vedlegg" />}
                                            </Tabs.List>
                                            <Tabs.Panel lazy={true} value="hoveddokument">
                                                <Dokument
                                                    journalPost={journalPost}
                                                    dokument={hovedDokument}
                                                    kanVises={tilgangTilHoveddokument}
                                                />
                                            </Tabs.Panel>
                                            {vedleggLength && (
                                                <Tabs.Panel lazy={true} value="vedlegg">
                                                    <JournalPostVedlegg
                                                        journalPost={journalPost}
                                                        brukersNavn={brukersNavn}
                                                    />
                                                </Tabs.Panel>
                                            )}
                                        </Tabs>
                                    </VStack>
                                )}
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </VStack>
    );
};

export default JournalPoster;
