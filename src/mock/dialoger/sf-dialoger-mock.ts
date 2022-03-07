import FetchMock, { MockRequest } from 'yet-another-fetch-mock';
import { apiBaseUri } from '../../api/config';
import { mockGeneratorMedFodselsnummer, verify, withDelayedResponse } from '../utils/fetch-utils';
import { randomDelay } from '../index';
import { MeldingerBackendMock } from '../mockBackend/meldingerBackendMock';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { Melding, Meldingstype, Traad } from '../../models/meldinger/meldinger';
import { guid } from 'nav-frontend-js-utils';
import {
    erMeldingFraBruker,
    erMeldingstypeSamtalereferat
} from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';

const STATUS_OK = () => 200;
const STATUS_BAD_REQUEST = () => 400;
let meldingerBackendMock: MeldingerBackendMock = null as unknown as MeldingerBackendMock;

const harEnhetIdSomQueryParam = (req: MockRequest) => {
    const enhetQueryParam = req.queryParams.enhet;
    if (!enhetQueryParam) {
        return 'Skal ha enhetId i queryParameter';
    }
    return undefined;
};

const fodselsNummerErGyldigStatus = (req: MockRequest) =>
    erGyldigFødselsnummer(req.pathParams.fodselsnummer) ? STATUS_OK() : STATUS_BAD_REQUEST();

function setupMeldingerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/dialog/:fodselsnummer/meldinger',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(
                randomDelay(),
                fodselsNummerErGyldigStatus,
                mockGeneratorMedFodselsnummer((fodselsnummer) =>
                    simulateSf(meldingerBackendMock.getMeldinger(fodselsnummer))
                )
            )
        )
    );
}

function simulateSf(trader: Traad[]): Traad[] {
    trader.forEach((trad: Traad) => {
        trad.meldinger.forEach((melding: Melding, index: number) => {
            melding.id = guid(); // Denne informasjonen får vi ikke, og autogenereres derfor på backend
            melding.oppgaveId = undefined; // Denne informasjonen får vi ikke

            // SF har bare samtalereferat og meldingskjede, så vi utleder de gamle typene etter beste evne.
            melding.meldingstype = (() => {
                if (erMeldingstypeSamtalereferat(melding.meldingstype)) {
                    return Meldingstype.SAMTALEREFERAT_TELEFON;
                } else if (erMeldingFraBruker(melding.meldingstype)) {
                    return index === 0 ? Meldingstype.SPORSMAL_SKRIFTLIG : Meldingstype.SVAR_SBL_INNGAAENDE;
                } else {
                    return index === 0 ? Meldingstype.SPORSMAL_MODIA_UTGAAENDE : Meldingstype.SVAR_SKRIFTLIG;
                }
            })();
            melding.statusTekst = undefined;
            // ferdigstilt finnes ikke i SF
            melding.erFerdigstiltUtenSvar = false;
            melding.ferdigstiltUtenSvarDato = undefined;
            melding.ferdigstiltUtenSvarAv = undefined;
        });
    });
    return trader;
}

function setupOpprettHenvendelseMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fnr/fortsett/opprett',
        withDelayedResponse(randomDelay(), STATUS_OK, (request) =>
            meldingerBackendMock.opprettHenvendelse(request.body)
        )
    );
}

function setupFerdigstillHenvendelseMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fnr/fortsett/ferdigstill',
        withDelayedResponse(randomDelay(), STATUS_OK, (request) => {
            meldingerBackendMock.ferdigstillHenvendelse(request.body);
            return {};
        })
    );
}

function setupSendReferatMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendreferat',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, (request) => {
            return meldingerBackendMock.sendReferat(request.body);
        })
    );
}

function setupSendSporsmalMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendsporsmal',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, (request) => {
            meldingerBackendMock.sendSporsmal(request.body);
            return {};
        })
    );
}

function setupSendInfomeldingMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendinfomelding',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, (request) => {
            meldingerBackendMock.sendInfomelding(request.body);
            return {};
        })
    );
}

function setupSendSvarMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendsvar',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, () => {
            return {};
        })
    );
}

function merkFeilsendtMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/feilsendt',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function sladdingMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/sladding',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function setupAvsluttOppgaveGosysMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/avsluttgosysoppgave',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function lukkTraadMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/lukk-traad',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

export function setupSFDialogMock(mock: FetchMock, backend: MeldingerBackendMock) {
    meldingerBackendMock = backend;

    setupMeldingerMock(mock);
    setupOpprettHenvendelseMock(mock);
    setupFerdigstillHenvendelseMock(mock);
    setupSendReferatMock(mock);
    setupSendSporsmalMock(mock);
    setupSendInfomeldingMock(mock);
    setupSendSvarMock(mock);
    merkFeilsendtMock(mock);
    sladdingMock(mock);
    lukkTraadMock(mock);
    setupAvsluttOppgaveGosysMock(mock);
}
