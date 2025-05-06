import { Button, Modal, Textarea } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useAvsluttOppgaveMutation } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';

type Props = {
    oppgave: OppgaveDto;
    open: boolean;
    onClose: () => void;
};

export const AvsluttOppgaveModal = ({ open, onClose, oppgave }: Props) => {
    const [beskrivelse, setBeskrivelse] = useState('');
    const enhet = useAtomValue(aktivEnhetAtom);
    const fnr = usePersonAtomValue();

    const { mutate, isPending } = useAvsluttOppgaveMutation();

    const avsluttOppgave = useCallback(() => {
        mutate(
            {
                body: {
                    fnr,
                    saksbehandlerValgtEnhet: enhet ?? '',
                    oppgaveid: oppgave.oppgaveId,
                    beskrivelse
                }
            },
            {
                onSettled: () => {
                    onClose();
                }
            }
        );
    }, [mutate, fnr, onClose, oppgave, enhet, beskrivelse]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{
                heading: 'Avslutt aktiv oppgave i GOSYS',
                size: 'small',
                closeButton: false
            }}
            width="small"
            size="small"
        >
            <Modal.Body>
                <Textarea label="Beskrivelse" value={beskrivelse} onChange={(e) => setBeskrivelse(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="primary" onClick={avsluttOppgave} loading={isPending}>
                    Avslutt oppgave
                </Button>
                <Button type="button" variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
