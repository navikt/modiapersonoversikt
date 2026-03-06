import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { AvsluttOppgaveModal } from 'src/components/Meldinger/AvsluttOppgave';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';

export const AvsluttOppgave = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const setDialogUnderArbeid = useSetAtom(dialogUnderArbeidAtom);

    const svarSamtale = useCallback(() => {
        setDialogUnderArbeid(oppgave.traadId);
    }, [oppgave.traadId, setDialogUnderArbeid]);

    const svarPaTraad = () => {
        navigate({
            to: '/new/person/meldinger',
            search: { traadId: oppgave.traadId }
        });
        svarSamtale();
    };

    return (
        <>
            {!oppgave.traadId ? (
                <Button size="small" variant="secondary" onClick={() => setOpen(true)}>
                    Avslutt
                </Button>
            ) : (
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <Button
                            size="small"
                            variant="secondary"
                            icon={<ChevronDownIcon aria-hidden />}
                            iconPosition="right"
                        >
                            Avslutt
                        </Button>
                    </ActionMenu.Trigger>
                    <ActionMenu.Content>
                        <ActionMenu.Item onClick={() => setOpen(true)}>Avslutt uten svar</ActionMenu.Item>
                        <ActionMenu.Item onClick={svarPaTraad}>Svar på tråd</ActionMenu.Item>
                    </ActionMenu.Content>
                </ActionMenu>
            )}
            <AvsluttOppgaveModal oppgave={oppgave} open={open} onClose={() => setOpen(false)} />
        </>
    );
};
