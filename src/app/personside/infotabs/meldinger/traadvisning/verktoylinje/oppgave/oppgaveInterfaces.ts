import {
    Ansatt,
    Enhet,
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
    valgtTema?: GsakTema;
    valgtOppgavetype?: GsakTemaOppgavetype;
    beskrivelse: string;
    valgtPrioritet?: string;
    valgtUnderkategori?: GsakTemaUnderkategori;
    valgtEnhet: Enhet;
    valgtAnsatt?: Ansatt;
}

export interface SkjermetOppgaveSkjemaForm {
    tema?: GsakTema;
    oppgavetype?: GsakTemaOppgavetype;
    beskrivelse: string;
    prioritet?: string;
    underkategori?: GsakTemaUnderkategori;
}
