import { OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { getSaksbehandlerEnhet } from '../../../../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import { formatterDatoTidNaa } from '../../../../../../../utils/dateUtils';

export function lagOppgaveRequest(props: OppgaveProps, form: OppgaveSkjemaProps): OpprettOppgaveRequest {
    const saksbehandlerEnhet = getSaksbehandlerEnhet();
    const valgtTema = form.state.valgtTema;
    const temakode = valgtTema ? valgtTema.kode : 'UKJENT';
    const valgtOppgavetype = form.state.valgtOppgavetype;

    return {
        valgtEnhetId: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        henvendelseId: props.valgtTraad ? eldsteMelding(props.valgtTraad).id : 'UKJENT',
        dagerFrist: valgtOppgavetype ? valgtOppgavetype.dagerFrist : 0,
        ansvarligIdent: props.innloggetSaksbehandler.ident,
        beskrivelse: lagBeskrivelse(form.state.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temakode: temakode,
        underkategorikode: form.state.valgtUnderkategori && form.state.valgtUnderkategori.kode,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: valgtOppgavetype ? valgtOppgavetype.kode : 'UKJENT',
        prioritetKode: form.state.valgtPrioritet + '_' + temakode
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
