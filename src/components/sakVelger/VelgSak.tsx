import { Button, Modal, Tag, VStack } from '@navikt/ds-react';
import { type ReactNode, useState } from 'react';
import SakVelger from 'src/components/sakVelger/SakVelger';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { useDisableDialog } from 'src/lib/state/dialog';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';

interface VelgSakProps {
    setSak: (sak: JournalforingSak) => void;
    valgtSak?: JournalforingSak;
    error?: ReactNode;
}

export default function VelgSak({ setSak, valgtSak, error }: VelgSakProps) {
    const [velgSakModalOpen, setVelgSakModalOpen] = useState(false);
    const disableDialog = useDisableDialog();

    return (
        <VStack gap="space-4">
            <VStack gap="space-8">
                <div className="max-w-30">
                    <Button
                        type="button"
                        id="knytt-dialog-til-sak"
                        variant="secondary"
                        size="xsmall"
                        disabled={disableDialog}
                        onClick={() => setVelgSakModalOpen(true)}
                        iconPosition="left"
                    >
                        Velg sak
                    </Button>
                </div>
                {valgtSak && (
                    <div className="flex-auto">
                        <Tag data-color="neutral" variant="outline" size="small">
                            {valgtSak.saksId} | {valgtSak.temaNavn} |{' '}
                            {formatterDatoMedMaanedsnavnOrNull(valgtSak.opprettetDato)}
                        </Tag>
                    </div>
                )}
                {error}
            </VStack>
            <Modal
                header={{ heading: 'Velg sak' }}
                open={velgSakModalOpen}
                width="50rem"
                onClose={() => setVelgSakModalOpen(false)}
                closeOnBackdropClick
            >
                <Modal.Body className="overflow-y-hidden">
                    <SakVelger
                        setSak={(sak) => {
                            const normalized = Object.fromEntries(
                                Object.entries(sak).map(([k, v]) => [k, v ?? undefined])
                            ) as JournalforingSak;
                            setSak({ ...normalized, fnr: undefined });
                            setVelgSakModalOpen(false);
                        }}
                    />
                </Modal.Body>
            </Modal>
        </VStack>
    );
}
