import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { apiBaseUri } from '../api/config';
import {
    mockGeneratorMedEnhetId,
    mockGeneratorMedFodselsnummer,
    mockGeneratorMedFodselsnummerV2,
    verify,
    withDelayedResponse
} from './utils/fetch-utils';
import { mockBaseUrls } from './baseUrls-mock';
import { getMockUtbetalinger } from './utbetalinger/utbetalinger-mock';
import { getMockSykepengerRespons } from './ytelse/sykepenger-mock';
import { getMockForeldrepenger } from './ytelse/foreldrepenger-mock';
import { getMockPleiepenger } from './ytelse/pleiepenger-mock';
import { mockFeatureToggle } from './featureToggle-mock';
import { getMockSaksoversiktV2 } from './saksoversikt/saksoversikt-mock';
import { getMockOppfolging, getMockYtelserOgKontrakter } from './oppfolging-mock';
import { getMockVarsler } from './varsler/varsel-mock';
import { getForeslattEnhet, getMockAnsatte, getMockEnheter, getMockGsakTema } from './meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { saker } from './journalforing/journalforing-mock';
import { mockPersonsokResponse, mockStaticPersonsokRequest } from './personsok/personsokMock';
import { getContextHandlers } from './context-mock';
import { getSaksBehandlersEnheterMock } from './getSaksBehandlersEnheterMock';
import { OppgaverBackendMock } from './mockBackend/oppgaverBackendMock';
import { saksbehandlerInnstillingerHandlers } from './saksbehandlerinnstillinger-mock';
import { getDraftHandlers } from './draft-mock';
import { authMock, tilgangskontrollMock } from './tilgangskontroll-mock';
import { MeldingerBackendMock } from './mockBackend/meldingerBackendMock';
import { getSFDialogHandlers } from './dialoger/sf-dialoger-mock';
import { getAktorId } from './aktorid-mock';
import { hentPersondata } from './persondata/persondata';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';

import { DefaultBodyType, http, HttpHandler, HttpResponse, PathParams, StrictRequest } from 'msw';
import { fodselsNummerErGyldigStatus, randomDelay, STATUS_OK } from './utils-mock';
import { getMockTiltakspenger } from './ytelse/tiltakspenger-mock';
import { mockInnkrevingsKrav } from './innkrevingskrav';
import MockDate from 'mockdate';

if (import.meta.env.VITE_E2E) {
    MockDate.set(0);
}

const oppgaveBackendMock = new OppgaverBackendMock();
const meldingerBackendMock = new MeldingerBackendMock(oppgaveBackendMock);

const harEnhetIdSomQueryParam = (request: StrictRequest<DefaultBodyType>) => {
    const url = new URL(request.url);
    const enhetQueryParam = url.searchParams.get('enhet');
    if (!enhetQueryParam) {
        return 'Skal ha enhetId i queryParameter';
    }
    return undefined;
};

const innloggetSaksbehandlerMock = http.get(apiBaseUri + '/hode/me', () =>
    HttpResponse.json(getMockInnloggetSaksbehandler())
);

const saksbehandlerEnheterHandler = http.get(
    apiBaseUri + '/hode/enheter',
    withDelayedResponse(randomDelay(), STATUS_OK, getSaksBehandlersEnheterMock)
);

const tilgangsKontrollHandler = [
    http.get(apiBaseUri + '/tilgang/auth', withDelayedResponse(randomDelay(), STATUS_OK, authMock)),

    http.get(
        apiBaseUri + '/tilgang/:fodselsnummer?',
        withDelayedResponse(
            randomDelay(),
            () => Promise.resolve(Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFodselsnummer(tilgangskontrollMock)
        )
    ),

    http.post(
        apiBaseUri + '/v2/tilgang',
        withDelayedResponse(
            randomDelay(),
            () => Promise.resolve(Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFodselsnummer(tilgangskontrollMock)
        )
    ),

    http.post(
        apiBaseUri + '/v2/tilgang',
        withDelayedResponse(
            randomDelay(),
            () => Promise.resolve(Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFodselsnummerV2(tilgangskontrollMock)
        )
    )
];

const persondataMock = http.post(
    apiBaseUri + '/v3/person',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => hentPersondata(fodselsnummer))
    )
);

const aktorIdMock = [
    http.post(
        apiBaseUri + '/v3/person/aktorid',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummerV2((fodselsnummer) => getAktorId(fodselsnummer))
        )
    )
];

const saksoversiktV2Handler = [
    http.get(
        apiBaseUri + '/saker/:fodselsnummer/v2/sakstema',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(
                randomDelay(),
                fodselsNummerErGyldigStatus,
                mockGeneratorMedFodselsnummer(getMockSaksoversiktV2)
            )
        )
    )
];

const saksoversiktV3Handler = http.post(
    apiBaseUri + '/v2/saker/v2/sakstema',
    verify(
        harEnhetIdSomQueryParam,
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummerV2(getMockSaksoversiktV2)
        )
    )
);

const utbetalingerHandler = http.post(
    apiBaseUri + '/v2/utbetaling',
    withDelayedResponse(randomDelay(), fodselsNummerErGyldigStatus, async (req, _params, body) => {
        const reqBody = body ?? (await req.json());
        const url = new URL(req.url);
        const query = url.searchParams;
        return getMockUtbetalinger(reqBody.fnr, query.get('startDato') ?? '', query.get('sluttDato') ?? '');
    })
);

const sykepengerHandler = http.post(
    apiBaseUri + '/v2/ytelse/sykepenger',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockSykepengerRespons(fodselsnummer))
    )
);

const foreldrepengerHandler = http.post(
    apiBaseUri + '/v2/ytelse/foreldrepenger',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockForeldrepenger(fodselsnummer))
    )
);

const pleiepengerHandler = http.post(
    apiBaseUri + '/v2/ytelse/pleiepenger',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockPleiepenger(fodselsnummer))
    )
);

const tiltakspengerMock = http.post(
    apiBaseUri + '/v2/ytelse/tiltakspenger',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockTiltakspenger(fodselsnummer))
    )
);

const oppfolgingHandler = http.post(
    apiBaseUri + '/v2/oppfolging',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockOppfolging(fodselsnummer))
    )
);

const ytelserogkontrakterHandler = http.post(
    apiBaseUri + '/v2/oppfolging/ytelserogkontrakter',
    withDelayedResponse(
        randomDelay(),
        fodselsNummerErGyldigStatus,
        mockGeneratorMedFodselsnummerV2((fodselsnummer) => getMockYtelserOgKontrakter(fodselsnummer))
    )
);

const varslerHandler = http.post<PathParams, { fnr: string }>(apiBaseUri + '/v3/varsler', async ({ request }) => {
    const body = await request.json();
    const fnr = body.fnr;
    if (!erGyldigFødselsnummer(fnr)) {
        return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(getMockVarsler(fnr));
});

const gsakHandler = http.get(
    apiBaseUri + '/dialogoppgave/v2/tema',
    withDelayedResponse(randomDelay(), STATUS_OK, () => getMockGsakTema())
);

const oppgaveEnhetHandler = http.get(
    apiBaseUri + '/enheter/oppgavebehandlere/alle',
    withDelayedResponse(randomDelay(), STATUS_OK, () => getMockEnheter())
);

const foreslotteEnhetHandler = http.get(
    apiBaseUri + '/enheter/oppgavebehandlere/v2/foreslatte',
    withDelayedResponse(randomDelay(), STATUS_OK, () => getForeslattEnhet())
);

const ansattePaaEnhetHandler = http.get(
    apiBaseUri + '/enheter/:enhetId/ansatte',
    withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedEnhetId((enhetId) => getMockAnsatte(enhetId))
    )
);

const personsokHandler = [
    http.post(
        apiBaseUri + '/personsok',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    ),
    http.post(
        apiBaseUri + '/personsok/v3',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    )
];

const tildelteOppgaverHandler = http.post(
    apiBaseUri + '/v2/oppgaver/tildelt',
    withDelayedResponse(randomDelay(), STATUS_OK, () => oppgaveBackendMock.getTildelteOppgaver())
);

const baseUrlsHandler = http.get(
    apiBaseUri + '/baseurls/v2',
    withDelayedResponse(randomDelay(), STATUS_OK, mockBaseUrls)
);

const featureToggleHandler = [
    http.get(
        apiBaseUri + '/featuretoggle/:toggleId',
        withDelayedResponse(randomDelay(), STATUS_OK, (_req, params: PathParams<'toggleId'>) =>
            mockFeatureToggle(params.toggleId as FeatureToggles)
        )
    ),

    http.get(apiBaseUri + '/featuretoggle', ({ request }) => {
        const id = new URL(request.url).searchParams.get('id')?.split(',');
        const ids = Array.isArray(id) ? id : [id];
        return HttpResponse.json(
            ids.reduce(
                (toggles, it) => ({ toggles, [it as FeatureToggles]: mockFeatureToggle(it as FeatureToggles) }),
                {}
            )
        );
    })
];

const journalForingHandler = [
    http.get(
        apiBaseUri + '/journalforing/:fnr/saker/',
        withDelayedResponse(randomDelay(), STATUS_OK, () => saker)
    ),
    http.post(
        apiBaseUri + '/v2/journalforing/saker/',
        withDelayedResponse(randomDelay(), STATUS_OK, () => saker)
    ),
    http.post(
        apiBaseUri + '/journalforing/:fnr/:traadId',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
        )
    ),
    http.post(
        apiBaseUri + '/v2/journalforing/:traadId',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
        )
    )
];

const opprettOppgaveHandler = http.post(
    apiBaseUri + '/dialogoppgave/v2/opprett',
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const opprettSkjermetOppgaveHandler = http.post(
    apiBaseUri + '/dialogoppgave/v2/opprettskjermetoppgave',
    withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
);

const standardteksterHandler = [
    http.get(
        `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => '')
    ),

    http.post(
        `${import.meta.env.BASE_URL}proxy/modia-skrivestotte/skrivestotte/statistikk/:id`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => undefined)
    )
];

const innkrevingsKravHandlers = [
    http.get(
        apiBaseUri + '/innkrevingskrav/:id',
        withDelayedResponse(0, STATUS_OK, (_, params) => mockInnkrevingsKrav(params.id as string))
    )
];

if (import.meta.env.MODE !== 'test') {
    console.log('=========================='); // tslint:disable-line
    console.log('======== MED MOCK ========'); // tslint:disable-line
    console.log('=========================='); // tslint:disable-line
}

export const handlers: HttpHandler[] = [
    innloggetSaksbehandlerMock,
    persondataMock,
    ...tilgangsKontrollHandler,
    ...saksoversiktV2Handler,
    ...aktorIdMock,
    saksoversiktV3Handler,
    utbetalingerHandler,
    sykepengerHandler,
    foreldrepengerHandler,
    pleiepengerHandler,
    tiltakspengerMock,
    tildelteOppgaverHandler,
    baseUrlsHandler,
    ...featureToggleHandler,
    oppfolgingHandler,
    gsakHandler,
    oppgaveEnhetHandler,
    foreslotteEnhetHandler,
    ansattePaaEnhetHandler,
    ytelserogkontrakterHandler,
    varslerHandler,
    opprettOppgaveHandler,
    opprettSkjermetOppgaveHandler,
    saksbehandlerEnheterHandler,
    ...personsokHandler,
    ...journalForingHandler,
    ...standardteksterHandler,
    ...getSFDialogHandlers(meldingerBackendMock),
    ...getContextHandlers(),
    ...saksbehandlerInnstillingerHandlers,
    ...getDraftHandlers(),
    ...innkrevingsKravHandlers,
    http.options('*', () => new HttpResponse(null, { status: 200 }))
];
