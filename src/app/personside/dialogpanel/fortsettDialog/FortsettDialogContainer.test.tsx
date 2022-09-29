import { finnPlukketOppgaveForTraad } from './FortsettDialogContainer';
import { Oppgave } from '../../../../models/meldinger/oppgave';
import { Traad } from '../../../../models/meldinger/meldinger';
import { FetchResult, Status } from '@nutgaard/use-fetch';

function restResource<Response>(status: Status.INIT | Status.OK, data?: Response): FetchResult<Response> {
    const resource = {
        status,
        data
    };
    return resource as unknown as FetchResult<Response>;
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
        fødselsnummer: 'N/A'
    };
}

describe('FortsettDialogContainer', () => {
    describe('finnPlukketOppgave', () => {
        it('skal returnere undefined/false om oppgaver ikke er lastet inn', () => {
            const resource = restResource<Oppgave[]>(Status.INIT);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('N/A'), resource);
            expect(oppgave).toBeUndefined();
            expect(erSTOOppgave).toBe(false);
        });

        it('skal returnere undefined/false om ingen oppgaver er tilknyttet tråd', () => {
            const resource = restResource<Oppgave[]>(Status.OK, [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: false })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('N/A'), resource);
            expect(oppgave).toBeUndefined();
            expect(erSTOOppgave).toBe(false);
        });

        it('skal returnere oppgave som er tilknyttet nåværende tråd', () => {
            const resource = restResource<Oppgave[]>(Status.OK, [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: true }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid2', erSTOOppgave: true }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid3', erSTOOppgave: false })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid3'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(erSTOOppgave).toBe(false);
        });

        it('skal riktig identifisere at oppgave er SPM_OG_SVAR oppgave', () => {
            const resource = restResource<Oppgave[]>(Status.OK, [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: false }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid1', erSTOOppgave: false }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid2', erSTOOppgave: true })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid2'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(oppgave?.erSTOOppgave).toBe(true);
            expect(erSTOOppgave).toBe(true);
        });

        it('skal riktig identifisere at oppgave ikke er SPM_OG_SVAR oppgave', () => {
            const resource = restResource<Oppgave[]>(Status.OK, [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: true }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid1', erSTOOppgave: true }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid2', erSTOOppgave: false })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid2'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(oppgave?.erSTOOppgave).toBe(false);
            expect(erSTOOppgave).toBe(false);
        });
    });
});
