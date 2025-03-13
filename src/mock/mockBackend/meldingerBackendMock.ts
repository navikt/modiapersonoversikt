import dayjs from 'dayjs';
import { guid } from 'nav-frontend-js-utils';
import type { JournalforingSak } from 'src/generated/modiapersonoversikt-api';
import { nyesteMelding } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import {
    LestStatus,
    type Melding,
    type MeldingJournalpost,
    Meldingstype,
    type OpprettHenvendelseRequest,
    type OpprettHenvendelseResponse,
    type SendMeldingRequest,
    type Traad
} from '../../models/meldinger/meldinger';
import { Temagruppe } from '../../models/temagrupper';
import { backendDatoTidformat } from '../../utils/date-utils';
import { getMockTraader } from '../meldinger/meldinger-mock';
import type { OppgaverBackendMock } from './oppgaverBackendMock';

export class MeldingerBackendMock {
    private sendteNyeMeldinger: Traad[] = [];
    private sendteSvar: Traad[] = [];
    private fnr = '';
    private oppgaveBackendMock: OppgaverBackendMock;
    private journalposter: Record<string, MeldingJournalpost[]> = {};

    constructor(oppgaveBackendMock: OppgaverBackendMock) {
        this.oppgaveBackendMock = oppgaveBackendMock;
    }

    private clearSendteMeldingerOnNewFnr(fnr: string) {
        if (fnr !== this.fnr) {
            this.sendteNyeMeldinger = [];
            this.sendteSvar = [];
            this.fnr = fnr;
        }
    }

    public getMeldinger(fnr: string): Traad[] {
        this.clearSendteMeldingerOnNewFnr(fnr);
        const mockTraader = getMockTraader(fnr);

        const alleTraader = [...this.sendteNyeMeldinger, ...mockTraader];

        return alleTraader.map((traad) => {
            const journalposter = this.journalposter[traad.traadId];

            const tilhorendeSvar = this.sendteSvar
                .filter((svar) => svar.traadId === traad.traadId)
                .flatMap((traad) => traad.meldinger);

            return maskerMeldingVedManglendeTilgang({
                traadId: traad.traadId,
                traadType: traad.traadType,
                temagruppe: traad.temagruppe,
                meldinger: [...tilhorendeSvar, ...traad.meldinger],
                journalposter: [...traad.journalposter, ...(journalposter ?? [])]
            });
        });
    }

    public sendMelding(request: SendMeldingRequest): Traad {
        if (request.oppgaveId) {
            this.oppgaveBackendMock.ferdigStillOppgave(request.oppgaveId);
        }
        const melding: Melding = {
            ...getMockMelding(),
            meldingstype: Meldingstype.SVAR_SKRIFTLIG,
            temagruppe: request.temagruppe ?? null,
            fritekst: request.fritekst
        };
        const traad = {
            traadId: request.traadId ?? guid(),
            traadType: request.traadType,
            temagruppe: request.temagruppe,
            meldinger: [melding],
            journalposter: []
        };
        if (request.traadId) {
            this.sendteSvar.unshift(traad);
        } else {
            this.sendteNyeMeldinger.unshift(traad);
        }
        return traad;
    }

    public opprettHenvendelse(request: OpprettHenvendelseRequest): OpprettHenvendelseResponse {
        const oppgave = this.oppgaveBackendMock.getTildelteOppgaver().find((it) => it.traadId === request.traadId);
        return {
            behandlingsId: guid(),
            oppgaveId: oppgave?.oppgaveId
        };
    }

    public journalfor(traadId: string, request: JournalforingSak) {
        const newJournalpost = toJournalpost(request);
        this.journalposter[traadId] = [...(this.journalposter[traadId] ?? []), newJournalpost];
    }
}

function toJournalpost(req: JournalforingSak): Traad['journalposter'][number] {
    return {
        journalfortAv: { navn: 'Veileder', ident: 'Z999999' },
        journalfortDato: dayjs().format(backendDatoTidformat),
        journalfortTema: req.temaKode as string,
        journalfortTemanavn: req.temaNavn as string,
        journalfortSaksid: req.saksId as string
    };
}

function getMockMelding(): Melding {
    return {
        id: `TRAD-${guid()}`,
        meldingsId: guid(),
        meldingstype: Meldingstype.SPORSMAL_SKRIFTLIG,
        temagruppe: Temagruppe.Arbeid,
        skrevetAvTekst: 'Saksbehandler',
        fritekst: 'Dette er en mock-melding',
        status: LestStatus.IkkeLest,
        opprettetDato: dayjs().format(backendDatoTidformat),
        sendtTilSladding: false
    };
}

function maskerMeldingVedManglendeTilgang(traad: Traad): Traad {
    const sisteMelding = nyesteMelding(traad);
    if (sisteMelding.temagruppe === Temagruppe.Arbeid) {
        // Simulerer at en melding blir sendt på et tema saksbehandler ikke har tilgang på tema Arbeid
        const nyMelding: Melding = {
            ...sisteMelding,
            fritekst:
                'Du kan ikke se innholdet i denne henvendelsen fordi tråden er journalført på Arbeid. Dette er hardkodet i mocken.'
        };
        const nyeMeldinger = [nyMelding, ...traad.meldinger.filter((melding) => melding !== sisteMelding)];
        return { ...traad, meldinger: nyeMeldinger };
    }
    return traad;
}
