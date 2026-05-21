import { BodyLong, Button, Dialog } from '@navikt/ds-react';
import { useState } from 'react';

export const AvbrytAlert = ({
    innhold,
    tittel,
    handleAvbryt,
    disablePopup
}: {
    innhold?: string;
    tittel?: string;
    handleAvbryt: () => void;
    disablePopup?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    if (disablePopup) {
                        handleAvbryt();
                    } else {
                        setIsOpen(true);
                    }
                }}
                data-color="danger"
                size="small"
                variant="secondary"
            >
                Avbryt
            </Button>
            <Dialog onOpenChange={(open: boolean) => setIsOpen(open)} open={isOpen}>
                <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                    <Dialog.Header withClosebutton={true}>
                        <Dialog.Title>{tittel ?? 'Ønsker du å avbryte?'}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <BodyLong>{innhold ?? 'Utkastet blir ikke lagret'}</BodyLong>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button size="medium" variant="secondary" data-color="neutral">
                                Nei
                            </Button>
                        </Dialog.CloseTrigger>
                        <Dialog.CloseTrigger>
                            <Button size="medium" variant="danger" onClick={handleAvbryt}>
                                Ja
                            </Button>
                        </Dialog.CloseTrigger>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </>
    );
};
