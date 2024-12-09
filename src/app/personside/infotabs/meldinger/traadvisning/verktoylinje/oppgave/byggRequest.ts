import type { Traad } from '../../../../../../../models/meldinger/meldinger';
import type {
    GsakTema,
    OpprettOppgaveRequest,
    OpprettSkjermetOppgaveRequest
} from '../../../../../../../models/meldinger/oppgave';
import { eldsteMelding } from '../../../utils/meldingerUtils';
import type { OppgaveSkjemaBegrensetTilgangForm, OppgaveSkjemaForm } from './oppgaveInterfaces';

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
    form: OppgaveSkjemaForm,
    fodselsnummer: string,
    saksbehandlerEnhet: string,
    gsakTema: Array<GsakTema>,
    valgtTraad?: Traad
): OpprettOppgaveRequest {
    const valgtEnhet = matchEnhet(form.valgtEnhet, 1);
    const valgtAnsatt = matchAnsatt(form.valgtAnsatt, 1);
    const valgtGsakTema = gsakTema.find((tema) => tema.kode === form.valgtTema);
    const valgtOppgaveType = valgtGsakTema?.oppgavetyper.find(
        (oppgavetype) => oppgavetype.kode === form.valgtOppgavetype
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
        beskrivelse: form.beskrivelse,
        temaKode: form.valgtTema,
        underkategoriKode: form.valgtUnderkategori && form.valgtUnderkategori,
        oppgaveTypeKode: valgtOppgaveType ? valgtOppgaveType.kode : 'UKJENT',
        prioritetKode: form.valgtPrioritet,
        ansvarligEnhetId: valgtEnhet!
    };
}

export function lagSkjermetOppgaveRequest(
    form: OppgaveSkjemaBegrensetTilgangForm,
    fodselsnummer: string,
    saksbehandlerEnhet: string
): OpprettSkjermetOppgaveRequest {
    const temakode = form.valgtTema ? form.valgtTema : 'UKJENT';

    if (!form.valgtPrioritet) {
        throw Error('Valgt prioritet er ikke valgt');
    }
    return {
        fnr: fodselsnummer,
        beskrivelse: form.beskrivelse,
        temaKode: temakode,
        underkategoriKode: form.valgtUnderkategori && form.valgtUnderkategori,
        oppgaveTypeKode: form.valgtOppgavetype ? form.valgtOppgavetype : 'UKJENT',
        prioritetKode: form.valgtPrioritet,
        opprettetavenhetsnummer: saksbehandlerEnhet ? saksbehandlerEnhet : '2820'
    };
}
