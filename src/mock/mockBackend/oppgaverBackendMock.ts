import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import type {
    OppgaveDto,
    OpprettOppgaveRequestDto,
    OpprettOppgaveResponseDto
} from 'src/generated/modiapersonoversikt-api';
import { simulateSf } from '../dialoger/sf-dialoger-mock';
import { statiskTraadMock } from '../meldinger/statiskTraadMock';
import { aremark } from '../persondata/aremark';
import type { MeldingerBackendMock } from './meldingerBackendMock';

export class OppgaverBackendMock {
    private tildelteOppgaver: OppgaveDto[] = [];
    private meldingerBackend: MeldingerBackendMock | null = null;
    private aremarkOppgaveFerdigstilt = false;

    public setMeldingerBackend(backend: MeldingerBackendMock) {
        this.meldingerBackend = backend;
    }

    public getTildelteOppgaver(fnr?: string): OppgaveDto[] {
        const tildelteOppgaver = this.tildelteOppgaver.filter((oppgave) => oppgave.fnr === fnr);
        if (fnr !== aremark.personIdent || this.aremarkOppgaveFerdigstilt) {
            return tildelteOppgaver;
        }

        return [
            {
                oppgaveId: 'aremark-oppgave',
                traadId: statiskTraadMock.traadId,
                fnr: aremark.personIdent,
                erSTOOppgave: false,
                tildeltEnhetsnr: '0118',
                tema: 'AAP',
                temagruppe: '',
                oppgavetype: 'VUR_SVAR',
                prioritet: 'NORM',
                status: '',
                aktivDato: dayjs().format('YYYY-MM-DD'),
                fristFerdigstillelse: dayjs().add(3, 'day').format('YYYY-MM-DD')
            },
            ...tildelteOppgaver
        ];
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
        if (oppgaveId === 'aremark-oppgave') {
            this.aremarkOppgaveFerdigstilt = true;
        }
        this.fjernOppgave(oppgaveId);
    }

    private fjernOppgave(oppgaveId: string) {
        this.tildelteOppgaver = this.tildelteOppgaver.filter((oppgave) => oppgave.oppgaveId !== oppgaveId);
    }
}
