import { OpprettOppgaveRequest } from '../../../../../../../models/meldinger/oppgave';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { OppgaveProps, OppgaveSkjemaProps } from './oppgaveInterfaces';
import { formatterDatoTidNaa } from '../../../../../../../utils/dateUtils';
import { Traad } from '../../../../../../../models/meldinger/meldinger';

export function lagOppgaveRequest(
    props: OppgaveProps,
    form: OppgaveSkjemaProps,
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

function lagBeskrivelse(
    beskrivelse: string,
    innloggetSaksbehandler: InnloggetSaksbehandler,
    saksbehandlerEnhet?: string
) {
    return `--- ${formatterDatoTidNaa()} ${innloggetSaksbehandler.navn} (${
        innloggetSaksbehandler.ident
    } ${saksbehandlerEnhet}) ---\n${beskrivelse}`;
}
