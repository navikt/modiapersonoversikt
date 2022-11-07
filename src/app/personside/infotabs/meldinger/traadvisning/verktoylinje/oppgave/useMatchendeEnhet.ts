import { UseFormReturn } from 'react-hook-form';
import { matchEnhet } from './byggRequest';
import { OppgaveSkjemaForm } from './oppgaveInterfaces';

export function useMatchendeEnhet({ watch }: UseFormReturn<OppgaveSkjemaForm>) {
    const valgtEnhet = watch('valgtEnhet');
    return matchEnhet(valgtEnhet, 1);
}
