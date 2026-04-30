import { BodyLong, Button, Dialog } from '@navikt/ds-react';

// Bruk children for å kunne overstyrre trigger med custom knapp
export const AvbrytAlert = ({
    innhold,
    tittel,
    handleAvbryt
}: {
    innhold?: string;
    tittel?: string;
    handleAvbryt: () => void;
}) => {
    return (
        <Dialog>
            <Dialog.Trigger>
                <Button data-color="danger" size="small">
                    Avbryt
                </Button>
            </Dialog.Trigger>
            <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                <Dialog.Header withClosebutton={true}>
                    <Dialog.Title>{tittel ?? 'Ønsker du å avbryte?'}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>{innhold ?? 'Utkastet blir ikke lagret.'}</BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button size="medium" variant="secondary" data-color="neutral">
                            Nei
                        </Button>
                    </Dialog.CloseTrigger>
                    <Dialog.CloseTrigger>
                        <Button size="medium" variant="danger" onClick={handleAvbryt}>
                            ja
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
