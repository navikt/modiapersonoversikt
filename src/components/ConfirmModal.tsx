import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { type ReactNode, useCallback, useRef } from 'react';

type Props = {
    confirmText: ReactNode;
    confirmLabel?: string;
    children?: ({ openModal }: { openModal: () => void }) => ReactNode;
    onConfirm: () => void;
    onCancel?: () => void;
    loading?: boolean;
    open?: boolean;
};

export const ConfirmModal = ({
    confirmText,
    confirmLabel = 'Bekreft',
    children,
    onConfirm,
    onCancel,
    loading,
    open
}: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    const openModal = useCallback(() => {
        ref.current?.show();
    }, []);

    const confirm = useCallback(() => {
        ref.current?.close();
        onConfirm();
    }, [onConfirm]);

    const cancel = useCallback(() => {
        ref.current?.close();
        onCancel?.();
    }, [onCancel]);

    return (
        <>
            {children?.({ openModal })}
            <Modal
                open={open}
                onClose={onCancel}
                header={{
                    heading: 'Bekreft handling',
                    size: 'small',
                    closeButton: false
                }}
                width="small"
                size="small"
            >
                <Modal.Body>
                    <BodyLong>{confirmText}</BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="primary" onClick={confirm} loading={loading}>
                        {confirmLabel}
                    </Button>
                    <Button type="button" variant="secondary" onClick={cancel}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
