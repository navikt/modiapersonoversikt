import { BodyShort, Button, HStack, Modal, Textarea, VStack } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';
import { useGsakTemaer } from 'src/components/Meldinger/List/utils';
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
    const { data: gsakTema } = useGsakTemaer();
    const tema = gsakTema.find((item) => item.kode === oppgave.tema);

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
            <VStack justify="space-between" gap="2">
                <HStack justify="start" gap="2" className="ml-4">
                    <BodyShort size="small" weight="semibold">
                        Tema:
                    </BodyShort>
                    <BodyShort size="small">{tema?.tekst ?? 'Ukjent tema'}</BodyShort>
                </HStack>
                <HStack justify="start" gap="2" className="ml-4">
                    <BodyShort size="small" weight="semibold">
                        OppgaveId:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.oppgaveId}</BodyShort>
                </HStack>
                <HStack justify="start" gap="2" className="ml-4">
                    <BodyShort size="small" weight="semibold">
                        TildeltEnhetsnr:
                    </BodyShort>
                    <BodyShort size="small">{oppgave.tildeltEnhetsnr}</BodyShort>
                </HStack>
            </VStack>

            <Modal.Body>
                <Textarea label="Beskrivelse" value={beskrivelse} onChange={(e) => setBeskrivelse(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="primary" size="small" onClick={avsluttOppgave} loading={isPending}>
                    Avslutt oppgave
                </Button>
                <Button type="button" variant="secondary" size="small" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
