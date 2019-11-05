import {
    Ansatt,
    Enhet,
    GsakTema,
    GsakTemaOppgavetype,
    GsakTemaUnderkategori,
    OppgavePrioritet,
    OpprettOppgaveRequest
} from '../../../../../../../models/meldinger/oppgave';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { PostResource } from '../../../../../../../rest/utils/postResource';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { ValideringsResultat } from '../../../../../../../utils/forms/FormValidator';

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
    valgtPrioritet: OppgavePrioritet;
    valgtUnderkategori?: GsakTemaUnderkategori;
    valgtEnhet?: Enhet;
    valgtAnsatt?: Ansatt;
}

export interface OppgaveSkjemaProps {
    state: OppgaveSkjemaForm;
    actions: {
        oppdaterStateVedValgtTema(tema: GsakTema | undefined): void;
        settValgtUnderkategori(underkategori: GsakTemaUnderkategori | undefined): void;
        settValgtOppgavetype(oppgavetype: GsakTemaOppgavetype | undefined): void;
        settValgtPrioritet(prioritet: OppgavePrioritet): void;
        settBeskrivelse(beskrivelse: string): void;
        settValgtEnhet(enhet: Enhet | undefined): void;
        settValgtAnsatt(ansatt: Ansatt | undefined): void;
    };
    valideringsResultat: ValideringsResultat<OppgaveSkjemaForm>;
}
