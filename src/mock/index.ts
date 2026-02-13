import {
    type DefaultBodyType,
    type HttpHandler,
    HttpResponse,
    http,
    type PathParams,
    type StrictRequest,
    type WebSocketHandler
} from 'msw';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import type {
    JournalforingSak,
    OpprettOppgaveRequestDto,
    OpprettOppgaveResponseDto
} from 'src/generated/modiapersonoversikt-api';
import { getMockArbeidsavklaringspengerResponse } from 'src/mock/ytelse/arbeidsavklaringspengerMock';
import { getMockForeldrepengerFpSakResponse } from 'src/mock/ytelse/foreldrepengerFpSakMock';
import { getMockPensjon } from 'src/mock/ytelse/pensjon-mock';
import { getMockPeriodeDagpengerDtoResponse } from 'src/mock/ytelse/periodeDagpengerDtoMock';
import { getMockSykpengerSpokelseResponse } from 'src/mock/ytelse/sykepengerSpokelseMock';
import type { FeatureTogglesResponse } from 'src/rest/resources/featuretogglesResource';
import { apiBaseUri } from '../api/config';
import type { FeatureToggles } from '../components/featureToggle/toggleIDs';
import { getAktorId } from './aktorid-mock';
import { mockBaseUrls } from './baseUrls-mock';
import { getContextHandlers } from './context-mock';
import { getSFDialogHandlers } from './dialoger/sf-dialoger-mock';
import { getDraftHandlers } from './draft-mock';
import { mockFeatureToggle } from './featureToggle-mock';
import { getSaksBehandlersEnheterMock } from './getSaksBehandlersEnheterMock';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { saker } from './journalforing/journalforing-mock';
import { getForeslattEnhet, getMockAnsatte, getMockEnheter, getMockGsakTema } from './meldinger/oppgave-mock';
import { MeldingerBackendMock } from './mockBackend/meldingerBackendMock';
import { OppgaverBackendMock } from './mockBackend/oppgaverBackendMock';
import {
    getMock14aVedtak,
    getMockArbeidsoppfolging,
    getMockOppfolging,
    getMockSykefravaersoppfolging,
    getMockYtelserOgKontrakter
} from './oppfolging-mock';
import { hentPersondata } from './persondata/persondata';
import { mockPersonsokResponse, mockStaticPersonsokRequest } from './personsok/personsokMock';
import { saksbehandlerInnstillingerHandlers } from './saksbehandlerinnstillinger-mock';
import { getMockSaksoversiktV2, getStaticMockSaksoOgDokumenter } from './saksoversikt/saksoversikt-mock';
import { skrivestotteMock } from './skrivestotte';
import { authMock, tilgangskontrollMock } from './tilgangskontroll-mock';
import { getMockUtbetalinger } from './utbetalinger/utbetalinger-mock';
import {
    mockGeneratorMedEnhetId,
    mockGeneratorMedFodselsnummer,
    mockGeneratorMedFodselsnummerV2,
    verify,
    withDelayedResponse
} from './utils/fetch-utils';
import { fodselsNummerErGyldigStatus, randomDelay, STATUS_OK } from './utils-mock';
import { getMockVarsler } from './varsler/varsel-mock';
import { getMockForeldrepenger } from './ytelse/foreldrepenger-mock';
import { getMockPleiepenger } from './ytelse/pleiepenger-mock';
import { getMockSykepengerRespons } from './ytelse/sykepenger-mock';
import { getMockTiltakspenger } from './ytelse/tiltakspenger-mock';

const oppgaveBackendMock = new OppgaverBackendMock();
const meldingerBackendMock = new MeldingerBackendMock(oppgaveBackendMock);

oppgaveBackendMock.setMeldingerBackend(meldingerBackendMock);

const harEnhetIdSomQueryParam = (request: StrictRequest<DefaultBodyType>) => {
    const url = new URL(request.url);
    const enhetQueryParam = url.searchParams.get('enhet');
    if (!enhetQueryParam) {
        return 'Skal ha enhetId i queryParameter';
    }
    return undefined;
};

const innloggetSaksbehandlerMock = http.get(`${apiBaseUri}/hode/me`, () =>
    HttpResponse.json(getMockInnloggetSaksbehandler())
);

const saksbehandlerEnheterHandler = http.get(
    `${apiBaseUri}/hode/enheter`,
    withDelayedResponse(randomDelay(), STATUS_OK, getSaksBehandlersEnheterMock)
);

const tilgangsKontrollHandler = [
    http.get(`${apiBaseUri}/tilgang/auth`, withDelayedResponse(randomDelay(), STATUS_OK, authMock)),

    http.post(
        `${apiBaseUri}/tilgang`,
        withDelayedResponse(
            randomDelay(),
            () => Promise.resolve(Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFodselsnummer(tilgangskontrollMock)
        )
    ),

    http.post(
        `${apiBaseUri}/tilgang`,
        withDelayedResponse(
            randomDelay(),
            () => Promise.resolve(Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFodselsnummerV2(tilgangskontrollMock)
        )
    )
];

const persondataMock = http.post(
    `${apiBaseUri}/person`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => hentPersondata(fodselsnummer))
    )
);

const aktorIdMock = [
    http.post(
        `${apiBaseUri}/person/aktorid`,
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummerV2((fodselsnummer) => getAktorId(fodselsnummer))
        )
    )
];

const saksoversiktV3Handler = http.post(
    `${apiBaseUri}/saker/sakstema`,
    verify(
        harEnhetIdSomQueryParam,
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummerV2(getMockSaksoversiktV2)
        )
    )
);

const sakerOgDokumenterHandler = http.post(
    `${apiBaseUri}/saker/saker_og_dokumenter`,
    verify(
        harEnhetIdSomQueryParam,
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummerV2((fodselsnummer) => getStaticMockSaksoOgDokumenter(fodselsnummer))
        )
    )
);

const utbetalingerHandler = http.post(
    `${apiBaseUri}/utbetaling`,
    withDelayedResponse(randomDelay(), fodselsNummerErGyldigStatus, async (req, _params, body) => {
        const reqBody = body ?? (await req.json());
        const url = new URL(req.url);
        const query = url.searchParams;
        return getMockUtbetalinger(reqBody.fnr, query.get('startDato') ?? '', query.get('sluttDato') ?? '');
    })
);

const sykepengerSpokelseHandler = http.post(
    `${apiBaseUri}/ytelse/spokelse_sykepenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockSykpengerSpokelseResponse(fodselsnummer))
    )
);

const sykepengerHandler = http.post(
    `${apiBaseUri}/ytelse/sykepenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockSykepengerRespons(fodselsnummer))
    )
);

const foreldrepengerHandler = http.post(
    `${apiBaseUri}/ytelse/foreldrepenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockForeldrepenger(fodselsnummer))
    )
);

const pleiepengerHandler = http.post(
    `${apiBaseUri}/ytelse/pleiepenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockPleiepenger(fodselsnummer))
    )
);

const tiltakspengerMock = http.post(
    `${apiBaseUri}/ytelse/tiltakspenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockTiltakspenger(fodselsnummer))
    )
);

const pensjonMock = http.post(
    `${apiBaseUri}/ytelse/pensjon`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fnr) => getMockPensjon(fnr))
    )
);

const arbeidsavklaringspengerMock = http.post(
    `${apiBaseUri}/ytelse/arbeidsavklaringspenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fnr) => getMockArbeidsavklaringspengerResponse(fnr))
    )
);

const foreldrepengerFpSakHandlerMock = http.post(
    `${apiBaseUri}/ytelse/foreldrepenger_fpsak`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockForeldrepengerFpSakResponse(fodselsnummer))
    )
);

const periodeDagpengerDtoHandlerMock = http.post(
    `${apiBaseUri}/ytelse/dagpenger`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockPeriodeDagpengerDtoResponse(fodselsnummer))
    )
);

const oppfolgingHandler = http.post(
    `${apiBaseUri}/oppfolging`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockOppfolging(fodselsnummer))
    )
);

const ytelserogkontrakterHandler = http.post(
    `${apiBaseUri}/oppfolging/ytelserogkontrakter`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockYtelserOgKontrakter(fodselsnummer))
    )
);

const gjeldende14aVedtakHandler = http.post(
    `${apiBaseUri}/oppfolging/hent-gjeldende-14a-vedtak`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMock14aVedtak(fodselsnummer))
    )
);

const sykefravaeroppfolgingHandler = http.post(
    `${apiBaseUri}/oppfolging/sykefravaeroppfolging`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockSykefravaersoppfolging(fodselsnummer))
    )
);

const arbeidsoppfolgingHandler = http.post(
    `${apiBaseUri}/oppfolging/arbeidsoppfolging`,
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockArbeidsoppfolging(fodselsnummer))
    )
);

const varslerHandler = http.post<PathParams, { fnr: string }>(`${apiBaseUri}/varsler`, async ({ request }) => {
    const body = await request.json();
    const fnr = body.fnr;
    if (!erGyldigFødselsnummer(fnr)) {
        return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(getMockVarsler(fnr));
});

const gsakHandler = http.get(
    `${apiBaseUri}/dialogoppgave/tema`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => getMockGsakTema())
);

const oppgaveEnhetHandler = http.get(
    `${apiBaseUri}/enheter/oppgavebehandlere/alle`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => getMockEnheter())
);

const foreslotteEnhetHandler = http.post(
    `${apiBaseUri}/enheter/oppgavebehandlere/foreslatte`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => getForeslattEnhet())
);

const ansattePaaEnhetHandler = http.get(
    `${apiBaseUri}/enheter/:enhetId/ansatte`,
    withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedEnhetId((enhetId) => getMockAnsatte(enhetId))
    )
);

const personsokHandler = [
    http.post(
        `${apiBaseUri}/personsok`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    ),
    http.post(
        `${apiBaseUri}/personsok/v3`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    )
];

const tildelteOppgaverHandler = http.post(
    `${apiBaseUri}/oppgaver/tildelt`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => oppgaveBackendMock.getTildelteOppgaver())
);

const baseUrlsHandler = http.get(`${apiBaseUri}/baseurls`, withDelayedResponse(randomDelay(), STATUS_OK, mockBaseUrls));

const featureToggleHandler = [
    http.get(
        `${apiBaseUri}/featuretoggle/:toggleId`,
        withDelayedResponse(randomDelay(), STATUS_OK, (_req, params: PathParams<'toggleId'>) =>
            mockFeatureToggle(params.toggleId as FeatureToggles)
        )
    ),

    http.get(`${apiBaseUri}/featuretoggle`, ({ request }) => {
        const id = new URL(request.url).searchParams.get('id')?.split(',');
        const ids = Array.isArray(id) ? id : [];
        return HttpResponse.json(
            ids.reduce((acc, it) => {
                acc[it as FeatureToggles] = mockFeatureToggle(it as FeatureToggles);
                return acc;
            }, {} as FeatureTogglesResponse)
        );
    })
];

const journalForingHandler = [
    http.get(
        `${apiBaseUri}/journalforing/:fnr/saker/`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => saker)
    ),
    http.post(
        `${apiBaseUri}/journalforing/saker/`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => saker)
    ),
    http.post(
        `${apiBaseUri}/journalforing/:fnr/:traadId`,
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
        )
    ),
    http.post(
        `${apiBaseUri}/journalforing/:traadId`,
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(randomDelay(), STATUS_OK, async (req, params: PathParams<'traadId'>) => {
                const body = (await req.json()) as JournalforingSak;
                meldingerBackendMock.journalfor(params.traadId as string, body);
                return {};
            })
        )
    )
];

const opprettOppgaveHandler = http.post(
    `${apiBaseUri}/dialogoppgave/opprett`,
    withDelayedResponse<OpprettOppgaveResponseDto, OpprettOppgaveRequestDto>(
        randomDelay(),
        STATUS_OK,
        async (request) => oppgaveBackendMock.opprettOppgave(await request.json())
    )
);

const opprettSkjermetOppgaveHandler = http.post(
    `${apiBaseUri}/dialogoppgave/opprettskjermetoppgave`,
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const standardteksterHandler = [
    http.get(
        `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => skrivestotteMock)
    ),

    http.post(
        `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte/statistikk/:id`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => undefined)
    )
];

if (import.meta.env.MODE !== 'test') {
    console.log('=========================='); // tslint:disable-line
    console.log('======== MED MOCK ========'); // tslint:disable-line
    console.log('=========================='); // tslint:disable-line
}

export const handlers: (HttpHandler | WebSocketHandler)[] = [
    innloggetSaksbehandlerMock,
    persondataMock,
    ...tilgangsKontrollHandler,
    ...aktorIdMock,
    saksoversiktV3Handler,
    sakerOgDokumenterHandler,
    utbetalingerHandler,
    sykepengerHandler,
    sykepengerSpokelseHandler,
    foreldrepengerHandler,
    pleiepengerHandler,
    tiltakspengerMock,
    foreldrepengerFpSakHandlerMock,
    periodeDagpengerDtoHandlerMock,
    pensjonMock,
    arbeidsavklaringspengerMock,
    tildelteOppgaverHandler,
    baseUrlsHandler,
    ...featureToggleHandler,
    oppfolgingHandler,
    gsakHandler,
    oppgaveEnhetHandler,
    foreslotteEnhetHandler,
    ansattePaaEnhetHandler,
    ytelserogkontrakterHandler,
    gjeldende14aVedtakHandler,
    sykefravaeroppfolgingHandler,
    arbeidsoppfolgingHandler,
    varslerHandler,
    opprettOppgaveHandler,
    opprettSkjermetOppgaveHandler,
    saksbehandlerEnheterHandler,
    ...personsokHandler,
    ...journalForingHandler,
    ...standardteksterHandler,
    ...getSFDialogHandlers(meldingerBackendMock, oppgaveBackendMock),
    ...getContextHandlers(),
    ...saksbehandlerInnstillingerHandlers,
    ...getDraftHandlers(),
    http.options('*', () => new HttpResponse(null, { status: 200 }))
];
