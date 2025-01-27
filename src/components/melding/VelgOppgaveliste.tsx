import { Radio, RadioGroup } from '@navikt/ds-react';

interface VelgOppgavelisteProps {
    valgtOppgaveliste?: Oppgaveliste;
    setValgtOppgaveliste: (oppgaveliste: Oppgaveliste) => void;
    enhet: string;
}

export default function VelgOppgaveliste({ valgtOppgaveliste, setValgtOppgaveliste, enhet }: VelgOppgavelisteProps) {
    const oppgavelisteRadioKnapper = Object.entries(Oppgaveliste).map(([key, value]) => (
        <Radio key={key} value={value}>
            {oppgavelisterTekst[value].svarSkalTil(enhet)}
        </Radio>
    ));
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

export enum Oppgaveliste {
    MinListe = 'MinListe',
    EnhetensListe = 'EnhetensListe'
}

interface OppgavelisteData {
    svarSkalTil: (enhet: string) => string;
}

const oppgavelisterTekst: Record<Oppgaveliste, OppgavelisteData> = {
    MinListe: {
        svarSkalTil: (enhet) => `Svar skal til min oppgaveliste hos ${enhet}`
    },
    EnhetensListe: {
        svarSkalTil: (enhet) => `Svar skal til ${enhet} sin oppgaveliste`
    }
} as const;
