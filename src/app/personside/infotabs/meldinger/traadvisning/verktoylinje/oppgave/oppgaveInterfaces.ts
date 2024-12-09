import type { Traad } from '../../../../../../../models/meldinger/meldinger';
import type { GsakTema } from '../../../../../../../models/meldinger/oppgave';

export interface OppgaveProps extends SkjermetOppgaveProps {
    valgtTraad: Traad;
}

export interface SkjermetOppgaveProps {
    gsakTema: GsakTema[];
    lukkPanel: () => void;
    onSuccessCallback?: () => void;
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
