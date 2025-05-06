import { guid } from 'nav-frontend-js-utils';
import type { OpprettOppgaveRequestDto, OpprettOppgaveResponseDto } from 'src/generated/modiapersonoversikt-api';
import type { Oppgave } from '../../models/meldinger/oppgave';
import { simulateSf } from '../dialoger/sf-dialoger-mock';
import type { MeldingerBackendMock } from './meldingerBackendMock';

export class OppgaverBackendMock {
    private tildelteOppgaver: Oppgave[] = [];
    private meldingerBackend: MeldingerBackendMock | null = null;

    public setMeldingerBackend(backend: MeldingerBackendMock) {
        this.meldingerBackend = backend;
    }

    public getTildelteOppgaver(): Oppgave[] {
        return this.tildelteOppgaver;
    }

    public opprettOppgave(oppgave: OpprettOppgaveRequestDto): OpprettOppgaveResponseDto {
        const id = guid();
        if (oppgave.ansvarligIdent === 'Z999999') {
            const traad = simulateSf(this.meldingerBackend?.getMeldinger(oppgave.fnr) ?? []).find((t) =>
                t.meldinger.some((m) => m.id === oppgave.behandlingskjedeId)
            );
            this.tildelteOppgaver.push({
                oppgaveId: id,
                fødselsnummer: oppgave.fnr,
                erSTOOppgave: false,
                traadId: traad?.traadId ?? oppgave.behandlingskjedeId
            });
        }

        return { id };
    }

    public ferdigStillOppgave(oppgaveId: string) {
        this.fjernOppgave(oppgaveId);
    }

    private fjernOppgave(oppgaveId: string) {
        this.tildelteOppgaver = this.tildelteOppgaver.filter((oppgave) => oppgave.oppgaveId !== oppgaveId);
    }
}
