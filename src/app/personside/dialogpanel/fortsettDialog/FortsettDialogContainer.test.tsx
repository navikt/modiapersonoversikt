import type { UseQueryResult } from '@tanstack/react-query';
import type { FetchError } from '../../../../api/api';
import type { Traad } from '../../../../models/meldinger/meldinger';
import type { Oppgave } from '../../../../models/meldinger/oppgave';
import { finnPlukketOppgaveForTraad } from './FortsettDialogContainer';

function restResource<Response>(status: 'loading' | 'success', data?: Response): UseQueryResult<Response, FetchError> {
    const resource = {
        data: status === 'success' ? data : null,
        isLoading: status !== 'success',
        isSuccess: status === 'success',
        status: status
    };
    return resource as unknown as UseQueryResult<Response, FetchError>;
}
function lagTraad(traadId: string): Traad {
    return {
        traadId,
        meldinger: [],
        journalposter: []
    };
}
function lagOppgave({ oppgaveId, traadId, erSTOOppgave }: Omit<Oppgave, 'fødselsnummer'>): Oppgave {
    return {
        oppgaveId,
        traadId,
        erSTOOppgave,
        fnr: 'N/A'
    };
}

describe('FortsettDialogContainer', () => {
    describe('finnPlukketOppgave', () => {
        it('skal returnere undefined/false om oppgaver ikke er lastet inn', () => {
            const resource = restResource<Oppgave[]>('loading');
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('N/A'), resource);
            expect(oppgave).toBeUndefined();
            expect(erSTOOppgave).toBe(false);
        });

        it('skal returnere undefined/false om ingen oppgaver er tilknyttet tråd', () => {
            const resource = restResource<Oppgave[]>('success', [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: false, fnr: 'N/A' })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('N/A'), resource);
            expect(oppgave).toBeUndefined();
            expect(erSTOOppgave).toBe(false);
        });

        it('skal returnere oppgave som er tilknyttet nåværende tråd', () => {
            const resource = restResource<Oppgave[]>('success', [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: true, fnr: 'N/A' }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid2', erSTOOppgave: true, fnr: 'N/A' }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid3', erSTOOppgave: false, fnr: 'N/A' })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid3'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(erSTOOppgave).toBe(false);
        });

        it('skal riktig identifisere at oppgave er SPM_OG_SVAR oppgave', () => {
            const resource = restResource<Oppgave[]>('success', [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: false, fnr: 'N/A' }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid1', erSTOOppgave: false, fnr: 'N/A' }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid2', erSTOOppgave: true, fnr: 'N/A' })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid2'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(oppgave?.erSTOOppgave).toBe(true);
            expect(erSTOOppgave).toBe(true);
        });

        it('skal riktig identifisere at oppgave ikke er SPM_OG_SVAR oppgave', () => {
            const resource = restResource<Oppgave[]>('success', [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: true, fnr: 'N/A' }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid1', erSTOOppgave: true, fnr: 'N/A' }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid2', erSTOOppgave: false, fnr: 'N/A' })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid2'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(oppgave?.erSTOOppgave).toBe(false);
            expect(erSTOOppgave).toBe(false);
        });
    });
});
