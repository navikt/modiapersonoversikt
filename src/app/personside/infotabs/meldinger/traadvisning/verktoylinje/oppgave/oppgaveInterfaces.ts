import type { Traad } from 'src/models/meldinger/meldinger';
import type { GsakTema } from 'src/models/meldinger/oppgave';

export interface OppgaveProps extends SkjermetOppgaveProps {
    valgtTraad: Traad;
}

export interface SkjermetOppgaveProps {
    gsakTema: GsakTema[];
    lukkPanel: () => void;
}

export type OppgaveSkjemaForm = {
    valgtEnhet: string;
    valgtAnsatt: string;
} & OppgaveSkjemaDelteFelter;

export type OppgaveSkjemaBegrensetTilgangForm = OppgaveSkjemaDelteFelter;

export type OppgaveSkjemaDelteFelter = {
    valgtTema: string;
    valgtOppgavetype: string;
    beskrivelse: string;
    valgtPrioritet: string;
    valgtUnderkategori: string;
};
