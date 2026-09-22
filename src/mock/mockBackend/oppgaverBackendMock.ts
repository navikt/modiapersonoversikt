import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import type {
    OppgaveDto,
    OpprettOppgaveRequestDto,
    OpprettOppgaveResponseDto
} from 'src/generated/modiapersonoversikt-api';
import { simulateSf } from '../dialoger/sf-dialoger-mock';
import type { MeldingerBackendMock } from './meldingerBackendMock';

export class OppgaverBackendMock {
    private tildelteOppgaver: OppgaveDto[] = [];
    private meldingerBackend: MeldingerBackendMock | null = null;

    public setMeldingerBackend(backend: MeldingerBackendMock) {
        this.meldingerBackend = backend;
    }

    public getTildelteOppgaver(): OppgaveDto[] {
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
                traadId: traad?.traadId ?? oppgave.behandlingskjedeId,
                fnr: oppgave.fnr,
                erSTOOppgave: false,
                tildeltEnhetsnr: '',
                tema: oppgave.temaKode,
                temagruppe: '',
                oppgavetype: oppgave.oppgaveTypeKode,
                prioritet: oppgave.prioritetKode,
                status: '',
                aktivDato: '',
                endretAvEnhetsnr: '',
                opprettetAvEnhetsnr: '',
                saksreferanse: '',
                beskrivelse: '',
                fristFerdigstillelse: dayjs()
                    .add(oppgave.dagerFrist ?? 0, 'day')
                    .format('YYYY-MM-DD'),
                opprettetTidspunkt: ''
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
