import { Button } from '@navikt/ds-react';

import { useState } from 'react';
import { AvsluttOppgaveModal } from 'src/components/Meldinger/AvsluttOppgave';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';

export const AvsluttOppgave = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button size="small" variant="secondary" onClick={() => setOpen(true)}>
                Avslutt
            </Button>
            <AvsluttOppgaveModal oppgave={oppgave} open={open} onClose={() => setOpen(false)} />
        </>
    );
};
