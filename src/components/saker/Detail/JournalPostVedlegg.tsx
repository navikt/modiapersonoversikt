import { Accordion, Alert, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import Dokument from 'src/components/saker/Detail/Dokument';
import { tekstBasertPaRetning } from 'src/components/saker/utils';
import type { Dokumentmetadata } from 'src/generated/modiapersonoversikt-api';

const JournalPostVedlegg = ({ journalPost, brukersNavn }: { journalPost: Dokumentmetadata; brukersNavn?: string }) => {
    if (journalPost.vedlegg.length === 0) {
        return (
            <Alert variant="info" className="my-4">
                Valgte sak har ikke vedlegg.
            </Alert>
        );
    }
    const [openMap, setOpenMap] = useState<{
        [key: string]: boolean;
    }>({});

    const handleAccordionChange = (id: string, isOpen: boolean) => {
        setOpenMap({
            ...openMap,
            [id]: isOpen
        });
    };

    return (
        <Accordion size="small" headingSize="xsmall">
            {journalPost.vedlegg.map((vedlegg, index) => {
                const key = `${index}`;
                const isOpen = openMap[key] ?? false;
                return (
                    <Accordion.Item key={key} open={isOpen} onOpenChange={() => handleAccordionChange(key, !isOpen)}>
                        <Accordion.Header>
                            {vedlegg.tittel}({tekstBasertPaRetning(brukersNavn, journalPost)})
                        </Accordion.Header>
                        <Accordion.Content>
                            {isOpen && (
                                <VStack gap="4" flexGrow="1" overflow="scroll">
                                    <Dokument
                                        journalPost={journalPost}
                                        kanVises={!vedlegg.logiskDokument}
                                        dokument={vedlegg}
                                    />
                                </VStack>
                            )}
                        </Accordion.Content>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

export default JournalPostVedlegg;
