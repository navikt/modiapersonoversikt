import {
    ForsettDialogRequest,
    LestStatus,
    Melding,
    Meldingstype,
    OpprettHenvendelseRequest,
    OpprettHenvendelseResponse,
    SendInfomeldingRequest,
    SendReferatRequest,
    SendSamtaleRequest,
    Traad
} from '../../models/meldinger/meldinger';
import { guid } from 'nav-frontend-js-utils';
import dayjs from 'dayjs';
import { getMockTraader } from '../meldinger/meldinger-mock';
import { Temagruppe } from '../../models/temagrupper';
import { OppgaverBackendMock } from './oppgaverBackendMock';
import { backendDatoTidformat } from '../../utils/date-utils';
import { nyesteMelding } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';

export class MeldingerBackendMock {
    private sendteNyeMeldinger: Traad[] = [];
    private sendteSvar: Traad[] = [];
    private fnr: string = '';
    private oppgaveBackendMock: OppgaverBackendMock;

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
            const tilhorendeSvar = this.sendteSvar
                .filter((svar) => svar.traadId === traad.traadId)
                .flatMap((traad) => traad.meldinger);
            return maskerMeldingVedManglendeTilgang({
                traadId: traad.traadId,
                traadType: traad.traadType,
                meldinger: [...tilhorendeSvar, ...traad.meldinger],
                journalposter: traad.journalposter
            });
        });
    }

    public sendReferat(request: SendReferatRequest): Traad {
        const melding: Melding = {
            ...getMockMelding(),
            meldingstype: request.meldingstype,
            temagruppe: request.temagruppe,
            fritekst: request.fritekst
        };
        const traad = {
            traadId: guid(),
            meldinger: [melding],
            journalposter: []
        };
        this.sendteNyeMeldinger.unshift(traad);
        return traad;
    }

    public sendSporsmal(request: SendSamtaleRequest): Traad {
        const melding: Melding = {
            ...getMockMelding(),
            meldingstype: Meldingstype.SPORSMAL_MODIA_UTGAAENDE,
            fritekst: request.fritekst
        };
        const traad = {
            traadId: guid(),
            meldinger: [melding],
            journalposter: []
        };
        this.sendteNyeMeldinger.unshift(traad);
        return traad;
    }

    public sendInfomelding(request: SendInfomeldingRequest): Traad {
        const melding: Melding = {
            ...getMockMelding(),
            meldingstype: Meldingstype.INFOMELDING_MODIA_UTGAAENDE,
            fritekst: request.fritekst
        };
        const traad = {
            traadId: guid(),
            meldinger: [melding],
            journalposter: []
        };
        this.sendteNyeMeldinger.unshift(traad);
        return traad;
    }

    public ferdigstillHenvendelse(request: ForsettDialogRequest): Traad {
        if (request.oppgaveId) {
            this.oppgaveBackendMock.ferdigStillOppgave(request.oppgaveId);
        }
        const melding: Melding = {
            ...getMockMelding(),
            fritekst: request.fritekst,
            meldingstype: request.meldingstype
        };
        const traad = {
            traadId: request.traadId,
            meldinger: [melding],
            journalposter: []
        };
        this.sendteSvar.unshift(traad);
        return traad;
    }

    public opprettHenvendelse(request: OpprettHenvendelseRequest): OpprettHenvendelseResponse {
        const oppgave = this.oppgaveBackendMock.getTildelteOppgaver().find((it) => it.traadId === request.traadId);
        return {
            behandlingsId: guid(),
            oppgaveId: oppgave?.oppgaveId
        };
    }
}

function getMockMelding(): Melding {
    return {
        id: 'TRAD-' + guid(),
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
    } else {
        return traad;
    }
}
