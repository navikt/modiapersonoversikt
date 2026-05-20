import { NotePencilIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Dialog, HStack } from '@navikt/ds-react';
import { useAtom, useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import { draftAtom, nyMeldingUnderArbeidAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';

export const MeldingPanelKnapper = () => {
    const openButtonRef = useRef<HTMLButtonElement | null>(null);
    const [svarUnderArbeid, setSvarUnderArbeid] = useAtom(svarUnderArbeidAtom);
    const [nyMeldingUnderArbeid, setNyMeldingUnderArbeid] = useAtom(nyMeldingUnderArbeidAtom);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const draft = useAtomValue(draftAtom);

    const handleStartNyMelding = () => {
        setSvarUnderArbeid(undefined);
        setNyMeldingUnderArbeid(true);
    };

    return (
        <HStack justify="center" align="center">
            <Button
                ref={openButtonRef}
                disabled={nyMeldingUnderArbeid}
                icon={<NotePencilIcon aria-hidden />}
                className="text-nowrap"
                size="small"
                variant="primary"
                data-color="success"
                onClick={() => {
                    if (svarUnderArbeid !== undefined && draft !== '') {
                        setIsDialogOpen(true);
                        return;
                    }
                    handleStartNyMelding();
                    trackGenereltUmamiEvent(trackingEvents.startNyMelding);
                }}
            >
                Skriv ny melding
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                    <Dialog.Header withClosebutton={true}>
                        <Dialog.Title>Vil du avbryte "Svar"?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <BodyLong>Du starter på en ny melding, og utkastet ditt vil kopieres</BodyLong>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button size="medium" variant="secondary" data-color="neutral">
                                Nei
                            </Button>
                        </Dialog.CloseTrigger>
                        <Dialog.CloseTrigger>
                            <Button size="medium" onClick={handleStartNyMelding}>
                                Ja
                            </Button>
                        </Dialog.CloseTrigger>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </HStack>
    );
};
