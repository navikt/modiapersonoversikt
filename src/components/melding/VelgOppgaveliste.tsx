import { Select } from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { type Oppgaveliste, OppgavelisteOptions } from 'src/components/melding/OppgavelisteOptions';
import { useEnhetsnavn } from 'src/lib/hooks/useEnhetsnavn';
import { aktivEnhetAtom } from 'src/lib/state/context';
import { useDisableDialog } from 'src/lib/state/dialog';

interface VelgOppgavelisteProps {
    valgtOppgaveliste?: Oppgaveliste;
    setValgtOppgaveliste: (oppgaveliste: Oppgaveliste) => void;
}

export default function VelgOppgaveliste({ valgtOppgaveliste, setValgtOppgaveliste }: VelgOppgavelisteProps) {
    const enhetsId = useAtomValue(aktivEnhetAtom);
    const enhetsNavn = useEnhetsnavn(enhetsId);
    const disableDialog = useDisableDialog();

    return (
        <Select
            disabled={disableDialog}
            label="Destinasjon for oppgave ved svar"
            hideLabel
            value={valgtOppgaveliste}
            size="small"
            onChange={(e) => {
                setValgtOppgaveliste(e.target.value as Oppgaveliste);
            }}
        >
            <OppgavelisteOptions enhet={enhetsNavn} />
        </Select>
    );
}
