import { PlusIcon } from '@navikt/aksel-icons';
import { Alert, Button, HGrid, Label, Modal, Tag, VStack } from '@navikt/ds-react';
import { type ReactNode, useState } from 'react';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';
import SakVelger from 'src/components/sakVelger/SakVelger';

interface VelgSakProps {
    setSak: (sak: JournalforingSak) => void;
    valgtSak?: JournalforingSak;
    error?: ReactNode;
}

export default function VelgSak({ setSak, valgtSak, error }: VelgSakProps) {
    const [velgSakModalOpen, setVelgSakModalOpen] = useState(false);

    return (
        <VStack gap="1">
            <Label htmlFor="knytt-dialog-til-sak">Knytt dialogen til en sak</Label>
            <VStack gap="2">
                <div className="max-w-30">
                    <Button
                        type="button"
                        id="knytt-dialog-til-sak"
                        variant="secondary"
                        size="small"
                        onClick={() => setVelgSakModalOpen(true)}
                        icon={<PlusIcon aria-hidden />}
                        iconPosition="left"
                    >
                        Velg sak
                    </Button>
                </div>
                {valgtSak && (
                    <div className="flex-auto">
                        <Tag variant="neutral" size="small">
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
                onClose={() => setVelgSakModalOpen(false)}
                closeOnBackdropClick
            >
                <Modal.Body>
                    <SakVelger.Root
                        setSak={(sak) => {
                            setSak(sak);
                            setVelgSakModalOpen(false);
                        }}
                    >
                        {(context) => (
                            <>
                                <SakVelger.RadioGroup valgtSakKategori={context.valgtSakKategori} setSakKategori={context.setSakKategori} />
                                <HGrid align="start" columns={2} gap="4">
                                    <div className="h-[60vh] overflow-y-auto">
                                        <SakVelger.TemaTable
                                            kategorier={context.fordelteSaker}
                                            valgtKategori={context.valgtSakKategori}
                                            valgtTema={context.valgtTema}
                                            setValgtTema={context.setValgtTema}
                                        />
                                    </div>
                                    <div className="h-[60vh] overflow-y-auto">
                                        <SakVelger.SakTable
                                            kategorier={context.fordelteSaker}
                                            valgtKategori={context.valgtSakKategori}
                                            valgtTema={context.valgtTema}
                                            setSak={context.setSak}
                                        />
                                    </div>
                                </HGrid>
                                {context.feiledeSystemer.map((feiledeSystem) => (
                                    <Alert variant="warning" key={feiledeSystem}>
                                        {feiledeSystem}
                                    </Alert>
                                ))}
                            </>
                        )}
                    </SakVelger.Root>
                </Modal.Body>
            </Modal>
        </VStack>
    );
}
