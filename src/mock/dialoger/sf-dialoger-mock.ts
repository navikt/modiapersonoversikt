import FetchMock, { MockRequest } from 'yet-another-fetch-mock';
import { apiBaseUri } from '../../api/config';
import { mockGeneratorMedFodselsnummerV2, verify, withDelayedResponse } from '../utils/fetch-utils';
import { fodselsNummerErGyldigStatus, randomDelay } from '../index';
import { MeldingerBackendMock } from '../mockBackend/meldingerBackendMock';
import { Melding, Meldingstype, Traad } from '../../models/meldinger/meldinger';
import { guid } from 'nav-frontend-js-utils';
import {
    erChatMelding,
    erMeldingFraBruker,
    erMeldingstypeSamtalereferat
} from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';

const STATUS_OK = () => 200;
let meldingerBackendMock: MeldingerBackendMock = null as unknown as MeldingerBackendMock;

const harEnhetIdSomQueryParam = (req: MockRequest) => {
    const enhetQueryParam = req.queryParams.enhet;
    if (!enhetQueryParam) {
        return 'Skal ha enhetId i queryParameter';
    }
    return undefined;
};

function setupMeldingerMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/v2/dialog/meldinger',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(
                randomDelay(),
                fodselsNummerErGyldigStatus,
                mockGeneratorMedFodselsnummerV2((fodselsnummer) =>
                    simulateSf(meldingerBackendMock.getMeldinger(fodselsnummer))
                )
            )
        )
    );
}

function simulateSf(trader: Traad[]): Traad[] {
    trader.forEach((trad: Traad) => {
        trad.meldinger.forEach((melding: Melding, index: number) => {
            melding.id = 'trad-' + guid(); // Denne informasjonen får vi ikke, og autogenereres derfor på backend
            melding.meldingsId = guid(); // Denne informasjonen får vi ikke, og autogenereres derfor på backend

            // SF har bare samtalereferat og meldingskjede, så vi utleder de gamle typene etter beste evne.
            melding.meldingstype = (() => {
                if (erMeldingstypeSamtalereferat(melding.meldingstype)) {
                    return Meldingstype.SAMTALEREFERAT_TELEFON;
                } else if (erChatMelding(melding.meldingstype)) {
                    return melding.meldingstype;
                } else if (erMeldingFraBruker(melding.meldingstype)) {
                    return index === 0 ? Meldingstype.SPORSMAL_SKRIFTLIG : Meldingstype.SVAR_SBL_INNGAAENDE;
                } else {
                    return index === 0 ? Meldingstype.SPORSMAL_MODIA_UTGAAENDE : Meldingstype.SVAR_SKRIFTLIG;
                }
            })();
        });
    });
    return trader;
}

function setupOpprettHenvendelseMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/v2/dialog/fortsett/opprett',
        withDelayedResponse(randomDelay(), STATUS_OK, (request) =>
            meldingerBackendMock.opprettHenvendelse(request.body)
        )
    );
}

function setupSendMeldingMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/v2/dialog/sendmelding',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, (request) => {
            return meldingerBackendMock.sendMelding(request.body);
        })
    );
}

function merkFeilsendtMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/v2/dialogmerking/feilsendt',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function sladdingMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/v2/dialogmerking/sladding',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
    mock.get(
        apiBaseUri + '/v2/dialogmerking/sladdearsaker/:kjedeId',
        withDelayedResponse(randomDelay(), STATUS_OK, () => [
            'Sendt til feil bruker',
            'Innholder sensitiv informasjon',
            'Meldingen burde ikke blitt sendt til NAV'
        ])
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
    setupSendMeldingMock(mock);
    merkFeilsendtMock(mock);
    sladdingMock(mock);
    lukkTraadMock(mock);
    setupAvsluttOppgaveGosysMock(mock);
}
