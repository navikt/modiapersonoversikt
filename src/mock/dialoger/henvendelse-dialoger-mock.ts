import FetchMock, { MockRequest } from 'yet-another-fetch-mock';
import { apiBaseUri } from '../../api/config';
import { mockGeneratorMedFodselsnummer, verify, withDelayedResponse } from '../utils/fetch-utils';
import { getMockSlaaSammen } from '../meldinger/meldinger-mock';
import { randomDelay } from '../index';
import { mockTilgangTilSlett } from '../meldinger/merk-mock';
import { MeldingerBackendMock } from '../mockBackend/meldingerBackendMock';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';

const STATUS_OK = () => 200;
const STATUS_BAD_REQUEST = () => 400;
let meldingerBackendMock: MeldingerBackendMock = (null as unknown) as MeldingerBackendMock;

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
                mockGeneratorMedFodselsnummer(fodselsnummer => meldingerBackendMock.getMeldinger(fodselsnummer))
            )
        )
    );
}

function setupSlasammenMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/slaasammen',
        withDelayedResponse(
            randomDelay(),
            STATUS_OK,
            mockGeneratorMedFodselsnummer(fodselsnummer => getMockSlaaSammen(fodselsnummer))
        )
    );
}

function setupOpprettHenvendelseMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fnr/fortsett/opprett',
        withDelayedResponse(randomDelay(), STATUS_OK, request => meldingerBackendMock.opprettHenvendelse(request.body))
    );
}

function setupFerdigstillHenvendelseMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fnr/fortsett/ferdigstill',
        withDelayedResponse(randomDelay(), STATUS_OK, request => {
            meldingerBackendMock.ferdigstillHenvendelse(request.body);
            return {};
        })
    );
}

function setupSendReferatMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendreferat',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, request => {
            return meldingerBackendMock.sendReferat(request.body);
        })
    );
}

function setupSendSporsmalMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendsporsmal',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, request => {
            meldingerBackendMock.sendSporsmal(request.body);
            return {};
        })
    );
}

function setupSendInfomeldingMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendinfomelding',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, request => {
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

function setupSendDelsvarMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fnr/delvis-svar',
        withDelayedResponse(randomDelay(), STATUS_OK, request => {
            meldingerBackendMock.sendDelsvar(request.body);
            return {};
        })
    );
}

function merkBidragMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/bidrag',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function merkFeilsendtMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/feilsendt',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function merkKontorsperretMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/kontorsperret',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function merkSlettMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/slett',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function setupTilgangTilSlettMock(mock: FetchMock) {
    mock.get(
        `${apiBaseUri}/dialogmerking/slett`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockTilgangTilSlett())
    );
}

function setupAvsluttOppgaveGosysMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/avsluttgosysoppgave',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function merkAvsluttMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/avslutt',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

export function setupHenvendelseDialogMock(mock: FetchMock, backend: MeldingerBackendMock) {
    meldingerBackendMock = backend;

    setupMeldingerMock(mock);
    setupOpprettHenvendelseMock(mock);
    setupFerdigstillHenvendelseMock(mock);
    setupSendDelsvarMock(mock);
    setupTilgangTilSlettMock(mock);
    setupSendReferatMock(mock);
    setupSendSporsmalMock(mock);
    setupSendInfomeldingMock(mock);
    setupSendSvarMock(mock);
    setupSlasammenMock(mock);
    merkAvsluttMock(mock);
    merkBidragMock(mock);
    merkFeilsendtMock(mock);
    merkKontorsperretMock(mock);
    merkSlettMock(mock);
    setupAvsluttOppgaveGosysMock(mock);
}
