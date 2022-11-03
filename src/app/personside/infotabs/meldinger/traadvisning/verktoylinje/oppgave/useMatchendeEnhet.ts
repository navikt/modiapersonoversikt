import { matchEnhet } from './byggRequest';
import { OppgaveSkjemaForm } from './oppgaveInterfaces';
import { UseOppgaveSkjemaWatch } from './oppgaveSkjemaTyper';

export function useMatchendeEnhet(watch: UseOppgaveSkjemaWatch<OppgaveSkjemaForm>) {
    const valgtEnhet = watch('valgtEnhet');
    return matchEnhet(valgtEnhet, 1);
}
