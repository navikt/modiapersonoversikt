import { getTilfeldigeOppgaver } from '../oppgave-mock';
import { LeggTilbakeOppgaveRequest, Oppgave } from '../../models/oppgave';

export class OppgaverBackendMock {
    private tildelteOppgaver: Oppgave[] = [];

    public plukkOppgave(): Oppgave[] {
        if (this.tildelteOppgaver.length > 0) {
            return this.tildelteOppgaver;
        }
        const tilfeldigeOppgaver = getTilfeldigeOppgaver();
        this.tildelteOppgaver = tilfeldigeOppgaver;
        return tilfeldigeOppgaver;
    }

    public getTildelteOppgaver(): Oppgave[] {
        return this.tildelteOppgaver;
    }

    public ferdigStillOppgave(oppgaveId: string) {
        this.fjernOppgave(oppgaveId);
    }

    public leggTilbake(body: LeggTilbakeOppgaveRequest) {
        this.fjernOppgave(body.oppgaveId);
        return {};
    }

    private fjernOppgave(oppgaveId: string) {
        this.tildelteOppgaver = this.tildelteOppgaver.filter(oppgave => oppgave.oppgaveId !== oppgaveId);
    }
}
