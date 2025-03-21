import { http, type DefaultBodyType } from 'msw';
import { guid } from 'nav-frontend-js-utils';
import type { LukkTraadRequest } from 'src/generated/modiapersonoversikt-api';
import { apiBaseUri } from '../../api/config';
import {
    erChatMelding,
    erMeldingFraBruker,
    erMeldingstypeSamtalereferat
} from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import {
    type Melding,
    Meldingstype,
    type OpprettHenvendelseRequest,
    type OpprettHenvendelseResponse,
    type SendMeldingRequest,
    type Traad
} from '../../models/meldinger/meldinger';
import type { MeldingerBackendMock } from '../mockBackend/meldingerBackendMock';
import { fodselsNummerErGyldigStatus, randomDelay } from '../utils-mock';
import { mockGeneratorMedFodselsnummerV2, verify, withDelayedResponse } from '../utils/fetch-utils';

const STATUS_OK = () => Promise.resolve(200);
let meldingerBackendMock: MeldingerBackendMock = null as unknown as MeldingerBackendMock;

const meldingerHandler = http.post(
    `${apiBaseUri}/v2/dialog/meldinger`,
    verify(
        () => undefined,
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
    //biome-ignore lint/complexity/noForEach: biome migration
    trader.forEach((trad: Traad) => {
        trad.meldinger.forEach((melding: Melding, index: number) => {
            melding.id = `trad-${guid()}`; // Denne informasjonen får vi ikke, og autogenereres derfor på backend
            melding.meldingsId = guid(); // Denne informasjonen får vi ikke, og autogenereres derfor på backend

            // SF har bare samtalereferat og meldingskjede, så vi utleder de gamle typene etter beste evne.
            melding.meldingstype = (() => {
                if (erMeldingstypeSamtalereferat(melding.meldingstype)) {
                    return Meldingstype.SAMTALEREFERAT_TELEFON;
                }
                if (erChatMelding(melding.meldingstype)) {
                    return melding.meldingstype;
                }
                if (erMeldingFraBruker(melding.meldingstype)) {
                    return index === 0 ? Meldingstype.SPORSMAL_SKRIFTLIG : Meldingstype.SVAR_SBL_INNGAAENDE;
                }
                return index === 0 ? Meldingstype.SPORSMAL_MODIA_UTGAAENDE : Meldingstype.SVAR_SKRIFTLIG;
            })();
        });
    });
    return trader;
}

const opprettHenvendelseHandler = http.post(
    `${apiBaseUri}/v2/dialog/fortsett/opprett`,
    withDelayedResponse<OpprettHenvendelseResponse, OpprettHenvendelseRequest>(
        randomDelay(),
        STATUS_OK,
        async (request) => meldingerBackendMock.opprettHenvendelse(await request.json())
    )
);

const sendMeldinghandler = http.post(
    `${apiBaseUri}/v2/dialog/sendmelding`,
    withDelayedResponse<Traad, SendMeldingRequest>(randomDelay() * 2, STATUS_OK, async (request) => {
        return meldingerBackendMock.sendMelding(await request.json());
    })
);

const merkFeilsendtHandler = http.post(
    `${apiBaseUri}/dialogmerking/feilsendt`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const sladdingHandlers = [
    http.post(
        `${apiBaseUri}/dialogmerking/sladding`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    ),
    http.get(
        `${apiBaseUri}/dialogmerking/sladdearsaker/:kjedeId`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => [
            'Sendt til feil bruker',
            'Innholder sensitiv informasjon',
            'Meldingen burde ikke blitt sendt til NAV'
        ])
    )
];

const avsluttOppgaveGosysHandler = http.post(
    `${apiBaseUri}/dialogmerking/avsluttgosysoppgave`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const lukkTraadHandler = http.post(
    `${apiBaseUri}/dialogmerking/lukk-traad`,
    withDelayedResponse<DefaultBodyType, LukkTraadRequest>(randomDelay(), STATUS_OK, async (request) => {
        const { traadId, fnr } = await request.json();
        meldingerBackendMock.lukkTraad(traadId, fnr);
    })
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
