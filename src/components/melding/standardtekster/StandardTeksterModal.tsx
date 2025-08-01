import { FileTextFillIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import { type RefObject, useRef } from 'react';
import StandardTekster from 'src/components/melding/standardtekster/StandardTekster';

function StandardTekstModal({
    submitTekst,
    textAreaRef
}: { submitTekst: (event: string) => void; textAreaRef?: RefObject<HTMLTextAreaElement | null> }) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const setTekst = (nyTekst: string) => {
        submitTekst(nyTekst);
        modalRef.current?.close();
        textAreaRef?.current?.focus();
    };

    return (
        <div>
            <Button
                variant="secondary"
                size="small"
                icon={<FileTextFillIcon fill="" title="Åpne og velg standardtekst modal" fontSize="1.5rem" />}
                onClick={(e) => {
                    e.preventDefault();
                    modalRef.current?.showModal();
                }}
            />
            <Modal
                autoFocus
                ref={modalRef}
                width="50rem"
                header={{ heading: 'Velg standardtekst', closeButton: false }}
            >
                <Modal.Body className="overflow-y-hidden ">
                    <StandardTekster modalRef={modalRef} velgTekst={setTekst} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StandardTekstModal;
