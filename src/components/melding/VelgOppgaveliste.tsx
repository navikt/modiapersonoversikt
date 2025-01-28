import { RadioGroup } from '@navikt/ds-react';
import type { ReactElement } from 'react';
import type { Oppgaveliste, OppgavelisteRadioKnapper } from 'src/components/melding/OppgavelisteRadioKnapper';

interface VelgOppgavelisteProps {
    valgtOppgaveliste?: Oppgaveliste;
    setValgtOppgaveliste: (oppgaveliste: Oppgaveliste) => void;
    oppgavelisteRadioKnapper: ReactElement<typeof OppgavelisteRadioKnapper>;
}

export default function VelgOppgaveliste({
    valgtOppgaveliste,
    setValgtOppgaveliste,
    oppgavelisteRadioKnapper
}: VelgOppgavelisteProps) {
    return (
        <RadioGroup
            legend="Destinasjon for oppgave ved svar"
            onChange={setValgtOppgaveliste}
            value={valgtOppgaveliste}
            size="small"
        >
            {oppgavelisteRadioKnapper}
        </RadioGroup>
    );
}
