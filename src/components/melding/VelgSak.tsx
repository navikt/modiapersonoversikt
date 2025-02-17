import { PlusIcon } from '@navikt/aksel-icons';
import { Alert, Button, HGrid, Label, Modal, Tag, VStack } from '@navikt/ds-react';
import { type ReactNode, useState } from 'react';
import SakVelger from 'src/components/sakVelger/SakVelger';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { formatterDatoMedMaanedsnavnOrNull } from 'src/utils/date-utils';

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
                <Modal.Body className="overflow-y-hidden">
                    <SakVelger.Root
                        setSak={(sak) => {
                            setSak(sak);
                            setVelgSakModalOpen(false);
                        }}
                    >
                        {({
                            setSak,
                            valgtSakKategori,
                            setSakKategori,
                            fordelteSaker,
                            valgtTema,
                            setTema,
                            feiledeSystemer
                        }) => (
                            <VStack gap="2">
                                <SakVelger.ToggleGroup
                                    valgtSakKategori={valgtSakKategori}
                                    setSakKategori={setSakKategori}
                                />
                                <HGrid align="start" columns={2} gap="4">
                                    <div className="h-[60vh] overflow-y-auto">
                                        <SakVelger.TemaTable
                                            kategorier={fordelteSaker}
                                            valgtKategori={valgtSakKategori}
                                            valgtTema={valgtTema}
                                            setValgtTema={setTema}
                                        />
                                    </div>
                                    <div className="h-[60vh] overflow-y-auto">
                                        <SakVelger.SakTable
                                            kategorier={fordelteSaker}
                                            valgtKategori={valgtSakKategori}
                                            valgtTema={valgtTema}
                                            setSak={setSak}
                                        />
                                    </div>
                                </HGrid>
                                {feiledeSystemer.map((feiledeSystem) => (
                                    <Alert variant="warning" key={feiledeSystem}>
                                        {feiledeSystem}
                                    </Alert>
                                ))}
                            </VStack>
                        )}
                    </SakVelger.Root>
                </Modal.Body>
            </Modal>
        </VStack>
    );
}
