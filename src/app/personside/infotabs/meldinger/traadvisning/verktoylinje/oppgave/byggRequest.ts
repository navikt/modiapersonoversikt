import {
    GsakTema,
    OpprettOppgaveRequest,
    OpprettSkjermetOppgaveRequest
} from '../../../../../../../models/meldinger/oppgave';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import { InnloggetSaksbehandler } from '../../../../../../../models/innloggetSaksbehandler';
import { OppgaveProps, OppgaveSkjemaForm, SkjermetOppgaveSkjemaForm } from './oppgaveInterfaces';
import { formatterDatoTidNaa } from '../../../../../../../utils/date-utils';
import { Traad } from '../../../../../../../models/meldinger/meldinger';
import { Mapped, Values } from '@nutgaard/use-formstate';

function captureBuilder(regex: RegExp) {
    return (value: string, capture: number): string | undefined => {
        const match = regex.exec(value);
        if (!match) {
            return undefined;
        }

        return match[capture];
    };
}
function assertRequired<T>(value: T, errorMessage: string) {
    if (!value) {
        throw new Error(errorMessage);
    }
}

export const matchEnhet = captureBuilder(/(\d{4}).*/);
const matchAnsatt = captureBuilder(/.*?\((.+)\)/);

export function lagOppgaveRequest(
    props: OppgaveProps,
    form: OppgaveSkjemaForm,
    fodselsnummer: string,
    saksbehandlerEnhet: string,
    gsakTema: Array<GsakTema>,
    valgtTraad?: Traad
): OpprettOppgaveRequest {
    const valgtEnhet = matchEnhet(form.valgtEnhet, 1);
    const valgtAnsatt = matchAnsatt(form.valgtAnsatt, 1);
    const valgtGsakTema = gsakTema.find(tema => tema.kode === form.valgtTema);
    const valgtOppgaveType = valgtGsakTema?.oppgavetyper.find(
        oppgavetype => oppgavetype.kode === form.valgtOppgavetype
    );

    assertRequired(form.valgtPrioritet, 'Valgt prioritet er ikke valgt');
    assertRequired(valgtEnhet, 'Valgt enhet er ikke valgt');

    return {
        fnr: fodselsnummer,
        opprettetavenhetsnummer: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        valgtEnhetId: saksbehandlerEnhet ? saksbehandlerEnhet : '2820',
        behandlingskjedeId: valgtTraad ? eldsteMelding(valgtTraad).id : 'UKJENT',
        dagerFrist: valgtOppgaveType ? valgtOppgaveType.dagerFrist : 0,
        ansvarligIdent: valgtAnsatt && valgtAnsatt,
        beskrivelse: lagBeskrivelse(form.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temaKode: form.valgtTema,
        underkategoriKode: form.valgtUnderkategori && form.valgtUnderkategori,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: valgtOppgaveType ? valgtOppgaveType.kode : 'UKJENT',
        prioritetKode: form.valgtPrioritet,
        ansvarligEnhetId: valgtEnhet!
    };
}

export function lagSkjermetOppgaveRequest(
    props: OppgaveProps,
    form: Mapped<Values<SkjermetOppgaveSkjemaForm>, string>,
    fodselsnummer: string,
    saksbehandlerEnhet: string
): OpprettSkjermetOppgaveRequest {
    const temakode = form.valgtTema ? form.valgtTema : 'UKJENT';

    if (!form.valgtPrioritet) {
        throw Error('Valgt prioritet er ikke valgt');
    }
    return {
        fnr: fodselsnummer,
        beskrivelse: lagBeskrivelse(form.beskrivelse, props.innloggetSaksbehandler, saksbehandlerEnhet),
        temaKode: temakode,
        underkategoriKode: form.valgtUnderkategori && form.valgtUnderkategori,
        brukerid: props.gjeldendeBrukerFnr,
        oppgaveTypeKode: form.valgtOppgavetype ? form.valgtOppgavetype : 'UKJENT',
        prioritetKode: form.valgtPrioritet,
        opprettetavenhetsnummer: saksbehandlerEnhet ? saksbehandlerEnhet : '2820'
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
