import { finnPlukketOppgaveForTraad } from './FortsettDialogContainer';
import {
    FinishedPostResource,
    NotStartedPostResource,
    PostResource,
    PostStatus
} from '../../../../rest/utils/postResource';
import { Oppgave } from '../../../../models/meldinger/oppgave';
import { Traad } from '../../../../models/meldinger/meldinger';

type UnifiedPostResource<Response> = NotStartedPostResource<any, Response> | FinishedPostResource<any, Response>;
function postResource<Response>(
    status: PostStatus.NOT_STARTED | PostStatus.SUCCESS,
    response?: Response
): PostResource<any, Response> {
    const resource: Partial<UnifiedPostResource<Response>> = {
        status,
        response
    };
    return (resource as unknown) as PostResource<any, Response>;
}
function lagTraad(traadId: string): Traad {
    return {
        traadId,
        meldinger: []
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
            const resource = postResource<Oppgave[]>(PostStatus.NOT_STARTED);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('N/A'), resource);
            expect(oppgave).toBeUndefined();
            expect(erSTOOppgave).toBe(false);
        });

        it('skal returnere undefined/false om ingen oppgaver er tilknyttet tråd', () => {
            const resource = postResource<Oppgave[]>(PostStatus.SUCCESS, [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: false })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('N/A'), resource);
            expect(oppgave).toBeUndefined();
            expect(erSTOOppgave).toBe(false);
        });

        it('skal returnere oppgave som er tilknyttet nåværende tråd', () => {
            const resource = postResource<Oppgave[]>(PostStatus.SUCCESS, [
                lagOppgave({ oppgaveId: 'oid1', traadId: 'tid1', erSTOOppgave: true }),
                lagOppgave({ oppgaveId: 'oid2', traadId: 'tid2', erSTOOppgave: true }),
                lagOppgave({ oppgaveId: 'oid3', traadId: 'tid3', erSTOOppgave: false })
            ]);
            const { oppgave, erSTOOppgave } = finnPlukketOppgaveForTraad(lagTraad('tid3'), resource);
            expect(oppgave?.oppgaveId).toBe('oid3');
            expect(erSTOOppgave).toBe(false);
        });

        it('skal riktig identifisere at oppgave er SPM_OG_SVAR oppgave', () => {
            const resource = postResource<Oppgave[]>(PostStatus.SUCCESS, [
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
            const resource = postResource<Oppgave[]>(PostStatus.SUCCESS, [
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
