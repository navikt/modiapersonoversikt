import { OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { getSaksbehandlerEnhet } from '../../../../../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import { formatterDatoTidNaa } from '../../../../../../../utils/dateUtils';

export function lagOppgaveRequest(props: OppgaveProps & { form: OppgaveSkjemaProps }): OpprettOppgaveRequest {
    const saksbehandlerEnhet = getSaksbehandlerEnhet();
    const valgtTema = props.form.state.valgtTema;
    const temakode = valgtTema ? valgtTema.kode : 'UKJENT';
    const valgtOppgavetype = props.form.state.valgtOppgavetype;

    return {
        valgtEnhetId: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        henvendelseId: props.valgtTraad ? eldsteMelding(props.valgtTraad).id : 'UKJENT',
        dagerFrist: valgtOppgavetype ? valgtOppgavetype.dagerFrist : 0,
        ansvarligIdent: props.innloggetSaksbehandler.ident,
        beskrivelse: lagBeskrivelse(props.form.state.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temakode: temakode,
        underkategorikode: props.form.state.valgtUnderkategori && props.form.state.valgtUnderkategori.kode,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: valgtOppgavetype ? valgtOppgavetype.kode : 'UKJENT',
        prioritetKode: props.form.state.valgtPrioritet + '_' + temakode
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
