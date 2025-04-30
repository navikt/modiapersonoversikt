import { guid } from 'nav-frontend-js-utils';
import type { OpprettOppgaveRequestDto, OpprettOppgaveResponseDto } from 'src/generated/modiapersonoversikt-api';
import type { Oppgave } from '../../models/meldinger/oppgave';

export class OppgaverBackendMock {
    private tildelteOppgaver: Oppgave[] = [];

    public getTildelteOppgaver(): Oppgave[] {
        return this.tildelteOppgaver;
    }

    public opprettOppgave(oppgave: OpprettOppgaveRequestDto): OpprettOppgaveResponseDto {
        const id = guid();
        if (oppgave.ansvarligIdent === 'Z999999') {
            this.tildelteOppgaver.push({
                oppgaveId: id,
                fødselsnummer: oppgave.fnr,
                erSTOOppgave: false,
                traadId: oppgave.behandlingskjedeId
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
