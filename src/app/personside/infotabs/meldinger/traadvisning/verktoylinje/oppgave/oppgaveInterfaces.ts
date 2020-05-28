import {
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OpprettOppgaveRequest
} from '../../../../../../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

export interface OppgaveProps {
    gsakTema: GsakTema[];
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
    lukkPanel: () => void;
    opprettOppgave: (request: OpprettOppgaveRequest) => void;
    onSuccessCallback?: () => void;
    valgtTraad?: Traad;
}

export interface OppgaveSkjemaForm {
    valgtTema: string;
    valgtOppgavetype: string;
    beskrivelse: string;
    valgtPrioritet: string;
    valgtUnderkategori: string;
    valgtEnhet: string;
    valgtAnsatt: string;
}

export interface SkjermetOppgaveSkjemaForm {
    tema: string;
    oppgavetype: string;
    beskrivelse: string;
    prioritet: string;
    underkategori: string;
}

export interface SkjermetOppgaveSkjemaRequest {
    tema?: GsakTema;
    oppgavetype?: GsakTemaOppgavetype;
    beskrivelse: string;
    prioritet?: string;
    underkategori?: GsakTemaUnderkategori;
}
