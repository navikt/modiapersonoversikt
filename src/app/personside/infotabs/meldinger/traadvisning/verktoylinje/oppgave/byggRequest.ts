import { OpprettOppgaveRequest, OpprettSkjermetOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import {
    OppgaveProps,
    OppgaveSkjemaProps,
    SkjermetOppgaveSkjemaForm,
    SkjermetPersonOppgaveSkjemaProps
} from './oppgaveInterfaces';
import { formatterDatoTidNaa } from '../../../../../../../utils/dateUtils';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { Mapped, Values } from '@nutgaard/use-formstate';

export function lagOppgaveRequest(
    props: OppgaveProps,
    form: OppgaveSkjemaProps | SkjermetPersonOppgaveSkjemaProps,
    fodselsnummer: string,
    saksbehandlerEnhet: string,
    valgtTraad?: Traad
): OpprettOppgaveRequest {
    const valgtTema = form.state.valgtTema;
    const temakode = valgtTema ? valgtTema.kode : 'UKJENT';
    const valgtOppgavetype = form.state.valgtOppgavetype;

    if (!form.state.valgtPrioritet) {
        throw Error('Valgt prioritet er ikke valgt');
    }

    return {
        fnr: fodselsnummer,
        valgtEnhetId: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        behandlingskjedeId: valgtTraad ? eldsteMelding(valgtTraad).id : 'UKJENT',
        dagerFrist: valgtOppgavetype ? valgtOppgavetype.dagerFrist : 0,
        ansvarligIdent: form.state.valgtAnsatt && form.state.valgtAnsatt.ident,
        beskrivelse: lagBeskrivelse(form.state.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temaKode: temakode,
        underkategoriKode: form.state.valgtUnderkategori && form.state.valgtUnderkategori.kode,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: valgtOppgavetype ? valgtOppgavetype.kode : 'UKJENT',
        prioritetKode: form.state.valgtPrioritet,
        ansvarligEnhetId: form.state.valgtEnhet!.enhetId
    };
}

export function lagSkjermetOppgaveRequest(
    props: OppgaveProps,
    form: Mapped<Values<SkjermetOppgaveSkjemaForm>, string>,
    fodselsnummer: string,
    saksbehandlerEnhet: string
): OpprettSkjermetOppgaveRequest {
    const temakode = form.tema ? form.tema : 'UKJENT';

    if (!form.prioritet) {
        throw Error('Valgt prioritet er ikke valgt');
    }
    return {
        fnr: fodselsnummer,
        //dagerFrist: valgtOppgavetype ? valgtOppgavetype.dagerFrist : 0,
        beskrivelse: lagBeskrivelse(form.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temaKode: temakode,
        underkategoriKode: form.underkategori && form.underkategori,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: form.oppgavetype ? form.oppgavetype : 'UKJENT',
        prioritetKode: form.prioritet
    };
}

function lagBeskrivelse(
    beskrivelse: string,
    innloggetSaksbehandler: InnloggetSaksbehandler,
    saksbehandlerEnhet?: string
) {
    return `--- ${formatterDatoTidNaa()} ${innloggetSaksbehandler.navn} (${
        innloggetSaksbehandler.ident
    } ${saksbehandlerEnhet}) ---\n${beskrivelse}`;
}
