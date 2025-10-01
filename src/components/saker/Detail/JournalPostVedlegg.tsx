import { Alert, Table, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Card from 'src/components/Card';
import Dokument from 'src/components/saker/Detail/Dokument';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';

const JournalPostVedlegg = ({ journalPost }: { journalPost: Dokumentmetadata }) => {
    const [openMap, setOpenMap] = useState<{
        [key: string]: boolean;
    }>({});

    if (journalPost.vedlegg.length === 0) {
        return (
            <Alert variant="info" className="my-4">
                Valgte saksdokument har ikke vedlegg.
            </Alert>
        );
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
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {journalPost.vedlegg.map((vedlegg, index) => {
                        const key = `${index}`;
                        const isOpen = openMap[key] ?? false;
                        return (
                            <Table.ExpandableRow
                                key={key}
                                onOpenChange={(open) => handleOnExpand(key, open)}
                                expandOnRowClick={true}
                                content={
                                    isOpen ? (
                                        <Card className="-ml-10 p-4 ">
                                            <Dokument
                                                journalPost={journalPost}
                                                kanVises={!vedlegg.logiskDokument}
                                                dokument={vedlegg}
                                            />
                                        </Card>
                                    ) : (
                                        ''
                                    )
                                }
                            >
                                <Table.DataCell scope="row">{vedlegg.tittel}</Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    })}
                </Table.Body>
            </Table>
        </VStack>
    );
};

export default JournalPostVedlegg;
