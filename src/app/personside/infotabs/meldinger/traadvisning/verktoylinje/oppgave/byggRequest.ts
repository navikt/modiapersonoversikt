import { OpprettOppgaveRequest, OpprettSkjermetOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { OppgaveProps, OppgaveSkjemaForm, SkjermetOppgaveSkjemaForm } from './oppgaveInterfaces';
import { formatterDatoTidNaa } from '../../../../../../../utils/dateUtils';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { Mapped, Values } from '@nutgaard/use-formstate';

export function lagOppgaveRequest(
    props: OppgaveProps,
    form: Mapped<Values<OppgaveSkjemaForm>, string>,
    fodselsnummer: string,
    saksbehandlerEnhet: string,
    valgtTraad?: Traad
): OpprettOppgaveRequest {
    if (!form.valgtPrioritet) {
        throw Error('Valgt prioritet er ikke valgt');
    }

    return {
        fnr: fodselsnummer,
        valgtEnhetId: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        behandlingskjedeId: valgtTraad ? eldsteMelding(valgtTraad).id : 'UKJENT',
        //dagerFrist: valgtOppgavetype ? valgtOppgavetype.dagerFrist : 0,
        ansvarligIdent: form.valgtAnsatt && form.valgtAnsatt,
        beskrivelse: lagBeskrivelse(form.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temaKode: form.valgtTema ? form.valgtTema : 'UKJENT',
        underkategoriKode: form.valgtUnderkategori && form.valgtUnderkategori,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: form.valgtOppgavetype ? form.valgtOppgavetype : 'UKJENT',
        prioritetKode: form.valgtPrioritet,
        ansvarligEnhetId: form.valgtEnhet ? form.valgtEnhet : 'UKJENT'
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
