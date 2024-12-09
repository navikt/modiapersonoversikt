import type { Oppgave } from '../../models/meldinger/oppgave';

export class OppgaverBackendMock {
    private tildelteOppgaver: Oppgave[] = [];

    public getTildelteOppgaver(): Oppgave[] {
        return this.tildelteOppgaver;
    }

    public ferdigStillOppgave(oppgaveId: string) {
        this.fjernOppgave(oppgaveId);
    }

    private fjernOppgave(oppgaveId: string) {
        this.tildelteOppgaver = this.tildelteOppgaver.filter((oppgave) => oppgave.oppgaveId !== oppgaveId);
    }
}
