import { Alert, Button, HGrid, Modal, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { FetchError } from 'src/api/api';
import SakVelger from 'src/components/sakVelger/SakVelger';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { useJournalforMutation } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { FetchErrorRenderer } from '../QueryErrorBoundary';
import { kanTraadJournalforesV2 } from './List/utils';

type Props = {
    traad: Traad;
    close: () => void;
};

export const JournalForingModal = ({ traad, close }: Props) => {
    const fnr = usePersonAtomValue();
    const enhet = useAtomValue(aktivEnhetAtom) as string;
    const [valgtSak, setValgtSak] = useState<JournalforingSak | undefined>();

    const kanJournalfores = kanTraadJournalforesV2(traad);

    const { mutate, isPending, error, isError } = useJournalforMutation();

    const journalFor = () => {
        if (!valgtSak) {
            return;
        }

        mutate(
            {
                params: { path: { traadId: traad.traadId }, query: { enhet } },
                body: { ...valgtSak, fnr }
            },
            { onSuccess: close }
        );
    };

    return (
        <Modal open onClose={close} header={{ heading: 'Journalfør dialog' }} closeOnBackdropClick>
            <Modal.Body className="overflow-y-hidden">
                {kanJournalfores ? (
                    <SakVelger.Root
                        setSak={(sak) => {
                            setValgtSak(sak);
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
                                            valgtSak={valgtSak}
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
                ) : (
                    <Alert variant="warning">Dialogen kan ikke journalføres</Alert>
                )}
                {isError &&
                    ((error as unknown) instanceof FetchError ? (
                        <FetchErrorRenderer error={error} title="Feilet ved journalføring" />
                    ) : (
                        <Alert variant="error" size="small">
                            Feilet ved journalføringen
                        </Alert>
                    ))}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={journalFor} disabled={!valgtSak} loading={isPending}>
                    Journalfør
                </Button>
                <Button onClick={close} variant="secondary">
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
