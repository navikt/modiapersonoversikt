import { GsakTema } from '../../../../../../../models/meldinger/oppgave';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

export interface OppgaveProps extends SkjermetOppgaveProps {
    valgtTraad: Traad;
}

export interface SkjermetOppgaveProps {
    gsakTema: GsakTema[];
    gjeldendeBrukerFnr: string;
    lukkPanel: () => void;
    onSuccessCallback?: () => void;
}

export type OppgaveSkjemaForm = {
    valgtTema: string;
    valgtOppgavetype: string;
    beskrivelse: string;
    valgtPrioritet: string;
    valgtUnderkategori: string;
    valgtEnhet: string;
    valgtAnsatt: string;
};
export type SkjermetOppgaveSkjemaForm = {
    valgtTema: string;
    valgtOppgavetype: string;
    beskrivelse: string;
    valgtPrioritet: string;
    valgtUnderkategori: string;
};
