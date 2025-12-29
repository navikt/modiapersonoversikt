import { FileTextIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import { type RefObject, useRef } from 'react';
import StandardTekster from 'src/components/melding/standardtekster/StandardTekster';
import useHotkey from 'src/utils/hooks/use-hotkey';

function StandardTekstModal({
    submitTekst,
    textAreaRef
}: { submitTekst: (event: string) => void; textAreaRef?: RefObject<HTMLTextAreaElement | null> }) {
    const modalRef = useRef<HTMLDialogElement>(null);

    useHotkey({ char: 'c', altKey: true }, () => modalRef.current?.showModal(), [], 'Standardtekster');

    const setTekst = (nyTekst: string) => {
        submitTekst(nyTekst);
        modalRef.current?.close();
        textAreaRef?.current?.focus();
    };

    return (
        <div>
            <Button
                variant="tertiary"
                size="small"
                icon={<FileTextIcon title="Vis standardtekster" />}
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
