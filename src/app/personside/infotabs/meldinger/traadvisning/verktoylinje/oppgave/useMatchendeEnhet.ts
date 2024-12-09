import type { UseFormReturn } from 'react-hook-form';
import { matchEnhet } from './byggRequest';
import type { OppgaveSkjemaForm } from './oppgaveInterfaces';

export function useMatchendeEnhet({ watch }: UseFormReturn<OppgaveSkjemaForm>) {
    const valgtEnhet = watch('valgtEnhet');
    return matchEnhet(valgtEnhet, 1);
}
