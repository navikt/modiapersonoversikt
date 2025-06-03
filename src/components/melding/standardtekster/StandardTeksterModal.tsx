import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import StandardTekster from 'src/components/melding/standardtekster/StandardTekster';

function StandardTekstModal() {
    const [open, setOpen] = useState<boolean>();

    return (
        <>
            <Button onClick={() => setOpen(true)}>Åpne modal</Button>
            <span className="sr-only">Standardtekster</span>
            <Modal open={open} header={{ heading: 'Velg standardtekst' }} onClose={() => setOpen(false)}>
                <Modal.Body className="overflow-y-hidden px-3">
                    <BodyLong className="p-0">
                        <StandardTekster />
                    </BodyLong>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default StandardTekstModal;
