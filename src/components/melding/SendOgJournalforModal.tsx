import { Button, Modal, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import SakVelger from 'src/components/sakVelger/SakVelger';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';

type Props = {
    isPending: boolean;
    disabled: boolean;
    onClose: () => void;
    onConfirm: (sak: JournalforingSak) => void;
};

export function SendOgJournalforModal({ isPending, disabled, onClose, onConfirm }: Props) {
    const [sak, setSak] = useState<JournalforingSak>();

    return (
        <Modal
            open
            width="50rem"
            header={{ heading: 'Send og journalfør referat', closeButton: !isPending }}
            onClose={onClose}
            onBeforeClose={() => !isPending}
            onCancel={(event) => {
                if (isPending) event.preventDefault();
            }}
        >
            <Modal.Body>
                <fieldset
                    disabled={isPending}
                    inert={isPending}
                    className="min-w-0"
                    aria-label="Velg journalføringssak"
                >
                    <VStack gap="space-16">
                        <p>Referatet sendes til brukeren og journalføres på saken du velger.</p>
                        <SakVelger valgtSak={sak} setSak={setSak} />
                        <p role="status">
                            {sak
                                ? sak.sakstype === 'GEN'
                                    ? `Generell sak: ${sak.temaNavn}`
                                    : `Valgt sak: ${sak.fagsystemSaksId} | ${sak.temaNavn}`
                                : 'Velg en sak for å sende og journalføre referatet.'}
                        </p>
                    </VStack>
                </fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    size="small"
                    disabled={disabled || isPending || !sak?.temaKode}
                    loading={isPending}
                    onClick={() => {
                        if (sak) onConfirm(sak);
                    }}
                >
                    Send og journalfør
                </Button>
                <Button type="button" size="small" variant="secondary" disabled={isPending} onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
