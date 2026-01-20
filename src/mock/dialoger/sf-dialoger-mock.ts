import { type DefaultBodyType, http } from 'msw';
import type { AvsluttGosysOppgaveRequest, LukkTraadRequest } from 'src/generated/modiapersonoversikt-api';
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
import type { OppgaverBackendMock } from '../mockBackend/oppgaverBackendMock';
import { mockGeneratorMedFodselsnummerV2, verify, withDelayedResponse } from '../utils/fetch-utils';
import { fodselsNummerErGyldigStatus, randomDelay } from '../utils-mock';

const STATUS_OK = () => Promise.resolve(200);
let meldingerBackendMock: MeldingerBackendMock = null as unknown as MeldingerBackendMock;
let oppgaverBackendMock: OppgaverBackendMock = null as unknown as OppgaverBackendMock;

const meldingerHandler = http.post(
    `${apiBaseUri}/dialog/meldinger`,
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

export function simulateSf(trader: Traad[]): Traad[] {
    //biome-ignore lint/complexity/noForEach: biome migration
    trader.forEach((trad: Traad) => {
        trad.meldinger.forEach((melding: Melding, index: number) => {
            melding.id = `${trad.traadId}-${hashCode(melding.fritekst)}`; // Denne informasjonen får vi ikke, og autogenereres derfor på backend

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

/**
 * Returns a hash code from a string
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        const chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const opprettHenvendelseHandler = http.post(
    `${apiBaseUri}/dialog/fortsett/opprett`,
    withDelayedResponse<OpprettHenvendelseResponse, OpprettHenvendelseRequest>(
        randomDelay(),
        STATUS_OK,
        async (request) => meldingerBackendMock.opprettHenvendelse(await request.json())
    )
);

const sendMeldinghandler = http.post(
    `${apiBaseUri}/dialog/sendmelding`,
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
    withDelayedResponse<string, AvsluttGosysOppgaveRequest>(randomDelay(), STATUS_OK, async (request) => {
        oppgaverBackendMock.ferdigStillOppgave((await request.json()).oppgaveid);
        return 'OK';
    })
);

const lukkTraadHandler = http.post(
    `${apiBaseUri}/dialogmerking/lukk-traad`,
    withDelayedResponse<DefaultBodyType, LukkTraadRequest>(randomDelay(), STATUS_OK, async (request) => {
        const { traadId, fnr } = await request.json();
        meldingerBackendMock.lukkTraad(traadId, fnr);
    })
);

export const getSFDialogHandlers = (backend: MeldingerBackendMock, oppgaverBackend: OppgaverBackendMock) => {
    meldingerBackendMock = backend;
    oppgaverBackendMock = oppgaverBackend;

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
