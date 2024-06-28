import { DefaultBodyType, http, StrictRequest } from 'msw';
import { apiBaseUri } from '../../api/config';
import { mockGeneratorMedFodselsnummerV2, verify, withDelayedResponse } from '../utils/fetch-utils';
import { fodselsNummerErGyldigStatus, randomDelay } from '../utils-mock';
import { MeldingerBackendMock } from '../mockBackend/meldingerBackendMock';
import {
    Melding,
    Meldingstype,
    OpprettHenvendelseRequest,
    SendMeldingRequest,
    Traad
} from '../../models/meldinger/meldinger';
import { guid } from 'nav-frontend-js-utils';
import {
    erChatMelding,
    erMeldingFraBruker,
    erMeldingstypeSamtalereferat
} from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';

const STATUS_OK = () => Promise.resolve(200);
let meldingerBackendMock: MeldingerBackendMock = null as unknown as MeldingerBackendMock;

const harEnhetIdSomQueryParam = (request: StrictRequest<DefaultBodyType>) => {
    const url = new URL(request.url);
    const enhetQueryParam = url.searchParams.get('enhet');
    if (!enhetQueryParam) {
        return 'Skal ha enhetId i queryParameter';
    }
    return undefined;
};

const meldingerHandler = http.post(
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

const opprettHenvendelseHandler = http.post(
    apiBaseUri + '/v2/dialog/fortsett/opprett',
    withDelayedResponse<OpprettHenvendelseRequest>(randomDelay(), STATUS_OK, async (request) =>
        meldingerBackendMock.opprettHenvendelse(await request.json())
    )
);

const sendMeldinghandler = http.post(
    apiBaseUri + '/v2/dialog/sendmelding',
    withDelayedResponse<SendMeldingRequest>(randomDelay() * 2, STATUS_OK, async (request) => {
        return meldingerBackendMock.sendMelding(await request.json());
    })
);

const merkFeilsendtHandler = http.post(
    apiBaseUri + '/v2/dialogmerking/feilsendt',
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const sladdingHandlers = [
    http.post(
        apiBaseUri + '/v2/dialogmerking/sladding',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    ),
    http.get(
        apiBaseUri + '/v2/dialogmerking/sladdearsaker/:kjedeId',
        withDelayedResponse(randomDelay(), STATUS_OK, () => [
            'Sendt til feil bruker',
            'Innholder sensitiv informasjon',
            'Meldingen burde ikke blitt sendt til NAV'
        ])
    )
];

const avsluttOppgaveGosysHandler = http.post(
    apiBaseUri + '/dialogmerking/avsluttgosysoppgave',
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const lukkTraadHandler = http.post(
    apiBaseUri + '/dialogmerking/lukk-traad',
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

export const getSFDialogHandlers = (backend: MeldingerBackendMock) => {
    meldingerBackendMock = backend;

    return [
        meldingerHandler,
        opprettHenvendelseHandler,
        sendMeldinghandler,
        merkFeilsendtHandler,
        ...sladdingHandlers,
        lukkTraadHandler,
        avsluttOppgaveGosysHandler
    ];
};
