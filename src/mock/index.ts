import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import Cookies from 'js-cookie';
import FetchMock, { Middleware, MiddlewareUtils, MockHandler, MockRequest } from 'yet-another-fetch-mock';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { apiBaseUri } from '../api/config';
import {
    mockGeneratorMedEnhetId,
    mockGeneratorMedFodselsnummer,
    verify,
    withDelayedResponse
} from './utils/fetch-utils';
import { mockBaseUrls } from './baseUrls-mock';
import { getMockVeilederRoller } from './veilderRoller-mock';
import { getMockUtbetalinger } from './utbetalinger/utbetalinger-mock';
import { getMockSykepengerRespons } from './ytelse/sykepenger-mock';
import { getMockForeldrepenger } from './ytelse/foreldrepenger-mock';
import { getMockPleiepenger } from './ytelse/pleiepenger-mock';
import { mockFeatureToggle } from './featureToggle-mock';
import { getMockSaksoversikt } from './saksoversikt/saksoversikt-mock';
import { getMockOppfolging, getMockYtelserOgKontrakter } from './oppfolging-mock';
import { getDittNavVarsler, getMockVarsler } from './varsler/varsel-mock';
import { getForeslattEnhet, getMockAnsatte, getMockEnheter, getMockGsakTema } from './meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { saker } from './journalforing/journalforing-mock';
import { mockPersonsokResponse, mockStaticPersonsokRequest } from './personsok/personsokMock';
import { setupWsControlAndMock } from './context-mock';
import standardTekster from './standardTeksterMock.js';
import { getSaksBehandlersEnheterMock } from './getSaksBehandlersEnheterMock';
import { saksbehandlerCookieNavnPrefix } from '../redux/session/saksbehandlersEnhetCookieUtils';
import { OppgaverBackendMock } from './mockBackend/oppgaverBackendMock';
import { setupSaksbehandlerInnstillingerMock } from './saksbehandlerinnstillinger-mock';
import { failurerateMiddleware } from './utils/failureMiddleware';
import { setupDraftMock } from './draft-mock';
import { authMock, tilgangskontrollMock } from './tilgangskontroll-mock';
import { delayed } from './utils-mock';
import { MeldingerBackendMock } from './mockBackend/meldingerBackendMock';
import { setupSFDialogMock } from './dialoger/sf-dialoger-mock';
import { setupHenvendelseDialogMock } from './dialoger/henvendelse-dialoger-mock';
import { FeatureToggles } from '../components/featureToggle/toggleIDs';
import { getAktorId } from './aktorid-mock';
import { hentPersondata } from './persondata/persondata';

const STATUS_OK = () => 200;
const STATUS_BAD_REQUEST = () => 400;

const oppgaveBackendMock = new OppgaverBackendMock();
const meldingerBackendMock = new MeldingerBackendMock(oppgaveBackendMock);

const harEnhetIdSomQueryParam = (req: MockRequest) => {
    const enhetQueryParam = req.queryParams.enhet;
    if (!enhetQueryParam) {
        return 'Skal ha enhetId i queryParameter';
    }
    return undefined;
};

export function randomDelay() {
    if (navfaker.random.vektetSjanse(0.05)) {
        return faker.random.number(5000);
    }
    return faker.random.number(750);
}

const fodselsNummerErGyldigStatus = (req: MockRequest) =>
    erGyldigFødselsnummer(req.pathParams.fodselsnummer) ? STATUS_OK() : STATUS_BAD_REQUEST();

function setupInnloggetSaksbehandlerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/hode/me',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getMockInnloggetSaksbehandler())
    );
}

function setUpSaksbehandlersEnheterMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/hode/enheter', withDelayedResponse(randomDelay(), STATUS_OK, getSaksBehandlersEnheterMock));
}

function setupTilgangskontroll(mock: FetchMock) {
    mock.get(
        '/modiapersonoversikt-api/rest/tilgang/auth',
        withDelayedResponse(randomDelay(), () => 200, authMock)
    );

    mock.get(
        '/modiapersonoversikt-api/rest/tilgang/:fodselsnummer?',
        withDelayedResponse(
            randomDelay(),
            () => (Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFodselsnummer(tilgangskontrollMock)
        )
    );
}

function setupPersondataMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/v2/person/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => hentPersondata(fodselsnummer))
        )
    );
}

function setupAktorIdMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/v2/person/:fodselsnummer/aktorid',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getAktorId(fodselsnummer))
        )
    );
}

function setupSaksoversiktMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/saker/:fodselsnummer/sakstema',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(
                randomDelay(),
                fodselsNummerErGyldigStatus,
                mockGeneratorMedFodselsnummer(getMockSaksoversikt)
            )
        )
    );
}

function setupUtbetalingerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/utbetaling/:fodselsnummer',
        withDelayedResponse(randomDelay(), fodselsNummerErGyldigStatus, (args) =>
            getMockUtbetalinger(args.pathParams.fodselsnummer, args.queryParams.startDato, args.queryParams.sluttDato)
        )
    );
}

function setupSykepengerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/ytelse/sykepenger/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getMockSykepengerRespons(fodselsnummer))
        )
    );
}

function setupForeldrepengerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/ytelse/foreldrepenger/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getMockForeldrepenger(fodselsnummer))
        )
    );
}

function setupPleiepengerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/ytelse/pleiepenger/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getMockPleiepenger(fodselsnummer))
        )
    );
}

function setupOppfolgingMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/oppfolging/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getMockOppfolging(fodselsnummer))
        )
    );
}

function setupYtelserOgKontrakter(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/oppfolging/:fodselsnummer/ytelserogkontrakter',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getMockYtelserOgKontrakter(fodselsnummer))
        )
    );
}

function setupVarselMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/varsler/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fodselsNummerErGyldigStatus,
            mockGeneratorMedFodselsnummer((fodselsnummer) => getMockVarsler(fodselsnummer))
        )
    );

    const dittnaveventHandler: MockHandler = (req, res, ctx) => {
        const headers: any = req.init?.headers;
        const fnr = headers.fodselsnummer;
        if (!erGyldigFødselsnummer(fnr)) {
            return res(ctx.status(400));
        }
        return res(ctx.status(200), ctx.json(getDittNavVarsler(fnr)));
    };

    mock.get(
        '/modiapersonoversikt/proxy/dittnav-eventer-modia/fetch/beskjed/all',
        delayed(randomDelay(), dittnaveventHandler)
    );
    mock.get(
        '/modiapersonoversikt/proxy/dittnav-eventer-modia/fetch/oppgave/all',
        delayed(randomDelay(), dittnaveventHandler)
    );
}

function setupGsakTemaMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/dialogoppgave/v2/tema',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getMockGsakTema())
    );
}

function setupOppgaveEnhetMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/enheter/oppgavebehandlere/alle',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getMockEnheter())
    );
}

function setupForeslatteEnheterMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/enheter/oppgavebehandlere/v2/foreslatte',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getForeslattEnhet())
    );
}

function setupAnsattePaaEnhetMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/enheter/:enhetId/ansatte',
        withDelayedResponse(
            randomDelay(),
            STATUS_OK,
            mockGeneratorMedEnhetId((enhetId) => getMockAnsatte(enhetId))
        )
    );
}

function setupPersonsokMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/personsok',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    );
    mock.post(
        apiBaseUri + '/personsok/v2',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    );
}

function setSaksbehandlerinnstillingerMockBackend(args: MockRequest) {
    Cookies.set(saksbehandlerCookieNavnPrefix + '-Z990099', args.body);
    return args.body;
}

function setupVelgEnhetMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/hode/velgenhet',
        withDelayedResponse(randomDelay(), STATUS_OK, setSaksbehandlerinnstillingerMockBackend)
    );
}

function setupOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/oppgaver/plukk/:temagruppe',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(randomDelay(), STATUS_OK, () => oppgaveBackendMock.plukkOppgave())
        )
    );
}

function setupTildelteOppgaverMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/oppgaver/tildelt/:fnr',
        withDelayedResponse(randomDelay(), STATUS_OK, () => oppgaveBackendMock.getTildelteOppgaver())
    );
}

function setupLeggTilbakeOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/oppgaver/legg-tilbake',
        withDelayedResponse(randomDelay(), STATUS_OK, (request) => oppgaveBackendMock.leggTilbake(request.body))
    );
}

function setupBaseUrlsMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/baseurls',
        withDelayedResponse(randomDelay(), STATUS_OK, () => {
            return mockBaseUrls();
        })
    );
}

function setupFeatureToggleMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/featuretoggle/:toggleId',
        withDelayedResponse(
            randomDelay(),
            STATUS_OK,
            // @ts-ignore
            (args: HandlerArgument) => mockFeatureToggle(args.pathParams.toggleId)
        )
    );
}

function setupVeilederRollerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/veileder/roller',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getMockVeilederRoller())
    );
}

function setupJournalforingMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/journalforing/:fnr/saker/',
        withDelayedResponse(randomDelay(), STATUS_OK, () => saker)
    );
    mock.post(
        apiBaseUri + '/journalforing/:fnr/:traadId',
        verify(
            harEnhetIdSomQueryParam,
            withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
        )
    );
}

function opprettOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogoppgave/v2/opprett',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function opprettSkjermetOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogoppgave/v2/opprettskjermetoppgave',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function setupStandardteksterMock(mock: FetchMock) {
    mock.get(
        '/modiapersonoversikt-skrivestotte/skrivestotte',
        withDelayedResponse(randomDelay(), STATUS_OK, () => standardTekster)
    );

    mock.post(
        '/modiapersonoversikt-skrivestotte/skrivestotte/statistikk/:id',
        withDelayedResponse(randomDelay(), STATUS_OK, () => undefined)
    );
}

const contentTypeMiddleware: Middleware = (requestArgs, response) => {
    if (response.headers) {
        return response;
    }
    response.headers = {
        'content-type': 'application/json'
    };
    return response;
};

console.log('=========================='); // tslint:disable-line
console.log('======== MED MOCK ========'); // tslint:disable-line
console.log('=========================='); // tslint:disable-line

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        contentTypeMiddleware,
        failurerateMiddleware(0.02),
        MiddlewareUtils.loggingMiddleware()
    )
});

setupInnloggetSaksbehandlerMock(mock);
setupPersondataMock(mock);
setupTilgangskontroll(mock);
setupSaksoversiktMock(mock);
setupUtbetalingerMock(mock);
setupSykepengerMock(mock);
setupForeldrepengerMock(mock);
setupPleiepengerMock(mock);
setupOppgaveMock(mock);
setupAktorIdMock(mock);

if (mockFeatureToggle(FeatureToggles.BrukSalesforceDialoger)) {
    setupSFDialogMock(mock, meldingerBackendMock);
} else {
    setupHenvendelseDialogMock(mock, meldingerBackendMock);
}

setupTildelteOppgaverMock(mock);
setupLeggTilbakeOppgaveMock(mock);
setupBaseUrlsMock(mock);
setupFeatureToggleMock(mock);
setupVeilederRollerMock(mock);
setupWsControlAndMock(mock);
setupOppfolgingMock(mock);
setupGsakTemaMock(mock);
setupOppgaveEnhetMock(mock);
setupForeslatteEnheterMock(mock);
setupAnsattePaaEnhetMock(mock);
setupYtelserOgKontrakter(mock);
setupVarselMock(mock);
opprettOppgaveMock(mock);
opprettSkjermetOppgaveMock(mock);
setupPersonsokMock(mock);
setupJournalforingMock(mock);
setupStandardteksterMock(mock);
setupVelgEnhetMock(mock);
setUpSaksbehandlersEnheterMock(mock);
setupSaksbehandlerInnstillingerMock(mock);
setupDraftMock(mock);
