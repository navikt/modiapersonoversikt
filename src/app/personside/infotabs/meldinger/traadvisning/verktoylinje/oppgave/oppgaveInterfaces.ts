import {
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet,
    OpprettOppgaveRequest
} from '../../../../../../../models/meldinger/oppgave';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { PostResource } from '../../../../../../../rest/utils/postResource';

export interface OppgaveProps {
    gsakTema: GsakTema[];
    valgtTraad?: Traad;
    gjeldendeBrukerFnr: string;
    innloggetSaksbehandler: InnloggetSaksbehandler;
    opprettOppgaveResource: PostResource<OpprettOppgaveRequest>;
    lukkPanel: () => void;
    opprettOppgave: (request: OpprettOppgaveRequest) => void;
}

export interface OppgaveSkjema {
    state: {
        valgtTema?: GsakTema;
        valgtOppgavetype?: GsakTemaOppgavetype;
        beskrivelse: string;
        valgtPrioritet: OppgavePrioritet;
        valgtUnderkategori?: GsakTemaUnderkategori;
    };
    actions: {
        settValgtTema(tema: GsakTema | undefined): void;
        settValgtUnderkategori(underkategori: GsakTemaUnderkategori | undefined): void;
        settValgtOppgavetype(oppgavetype: GsakTemaOppgavetype | undefined): void;
        settValgtPrioritet(prioritet: OppgavePrioritet): void;
        settBeskrivelse(beskrivelse: string): void;
    };
}
