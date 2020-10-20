import { GsakTema, OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

export interface OppgaveProps extends SkjermetOppgaveProps {
    valgtTraad: Traad;
}

export interface SkjermetOppgaveProps {
    gsakTema: GsakTema[];
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
    lukkPanel: () => void;
    opprettOppgave: (request: OpprettOppgaveRequest) => void;
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
