import { Alert, Table, Tabs, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Card from 'src/components/Card';
import Dokument from 'src/components/saker/Detail/Dokument';
import JournalPostVedlegg from 'src/components/saker/Detail/JournalPostVedlegg';
import { avsenderBasertPaRetning, dokumentKanVises, mottakerBasertPaRetning } from 'src/components/saker/utils';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoTid } from 'src/utils/date-utils';
import { datoEllerNull } from 'src/utils/string-utils';

const JournalPostDetaljer = ({ journalPost, columns }: { journalPost: Dokumentmetadata; columns?: number }) => {
    const hovedDokument = journalPost.hoveddokument;
    const vedleggLength = journalPost.vedlegg.length;
    const tilgangTilHoveddokument = dokumentKanVises(journalPost, hovedDokument);

    const getDokumentEntries = (journalPost: Dokumentmetadata, dokument: Dokument) => {
        return {
            JournalpostId: journalPost.journalpostId,
            Status: dokument.dokumentStatus,
            Lestdato: journalPost.lestDato ? formatterDatoTid(new Date(journalPost.lestDato)) : 'Ikke lest',
            Vedlegg: vedleggLength ? `${vedleggLength} vedlegg` : 'Ingen vedlegg'
        };
    };

    return (
        <VStack gap="4" flexGrow="1" overflow="scroll">
            <TitleValuePairsComponent entries={getDokumentEntries(journalPost, hovedDokument)} columns={columns} />
            <Tabs defaultValue="hoveddokument">
                <Tabs.List>
                    <Tabs.Tab value="hoveddokument" label="Hoveddokument" />
                    {vedleggLength && <Tabs.Tab value="vedlegg" label="Vedlegg" />}
                </Tabs.List>
                <Tabs.Panel lazy={true} value="hoveddokument">
                    <Dokument journalPost={journalPost} dokument={hovedDokument} kanVises={tilgangTilHoveddokument} />
                </Tabs.Panel>
                {vedleggLength && (
                    <Tabs.Panel lazy={true} value="vedlegg">
                        <JournalPostVedlegg journalPost={journalPost} />
                    </Tabs.Panel>
                )}
            </Tabs>
        </VStack>
    );
};

const JournalPoster = ({
    journalPoster,
    brukersNavn,
    columns
}: { journalPoster: Dokumentmetadata[]; brukersNavn: string; columns?: number }) => {
    const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});

    if (journalPoster.length === 0) {
        return <Alert variant="info">Valgte sak har ikke dokumenter.</Alert>;
    }

    const handleOnExpand = (id: string, isOpen: boolean) => {
        setOpenMap({
            ...openMap,
            [id]: isOpen
        });
    };

    return (
        <VStack gap="2">
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">Dokument</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Avsender</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Mottaker</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {journalPoster.map((journalPost, i) => {
                        const isOpen = openMap[journalPost.id] ?? false;
                        return (
                            <Table.ExpandableRow
                                key={i + journalPost.id}
                                onOpenChange={(open) => handleOnExpand(journalPost.id, open)}
                                expandOnRowClick={true}
                                content={
                                    isOpen ? (
                                        <Card className="-ml-10 p-4 ">
                                            <JournalPostDetaljer journalPost={journalPost} columns={columns} />
                                        </Card>
                                    ) : (
                                        ''
                                    )
                                }
                            >
                                <Table.DataCell scope="row">{journalPost.hoveddokument.tittel}</Table.DataCell>
                                <Table.DataCell scope="row">
                                    {avsenderBasertPaRetning(brukersNavn, journalPost)}
                                </Table.DataCell>
                                <Table.DataCell scope="row">
                                    {mottakerBasertPaRetning(brukersNavn, journalPost)}
                                </Table.DataCell>
                                <Table.DataCell>{datoEllerNull(journalPost.dato)}</Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    })}
                </Table.Body>
            </Table>
        </VStack>
    );
};

export default JournalPoster;
