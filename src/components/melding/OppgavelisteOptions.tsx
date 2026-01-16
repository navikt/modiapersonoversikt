interface OppgavelisteRadioKnapperProps {
    enhet: string;
}

export function OppgavelisteOptions({ enhet }: OppgavelisteRadioKnapperProps) {
    return Object.entries(Oppgaveliste).map(([key, value]) => (
        <option key={key} value={value}>
            {oppgavelisterTekst[value].svarSkalTil(enhet)}
        </option>
    ));
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
