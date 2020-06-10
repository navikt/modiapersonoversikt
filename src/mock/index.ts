import faker from 'faker/locale/nb_NO';
import navfaker from 'nav-faker';
import Cookies from 'js-cookie';
import FetchMock, {
    HandlerArgument,
    Middleware,
    MiddlewareUtils,
    MockHandler,
    ResponseUtils
} from 'yet-another-fetch-mock';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';

import { apiBaseUri } from '../api/config';
import { getPerson } from './person/personMock';
import { getMockKontaktinformasjon } from './person/krrKontaktinformasjon/kontaktinformasjon-mock';
import { mockGeneratorMedEnhetId, mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils/fetch-utils';
import { getMockNavKontor } from './navkontor-mock';
import { erEgenAnsatt } from './egenansatt-mock';
import { mockBaseUrls } from './baseUrls-mock';
import { getMockVeilederRoller } from './veilderRoller-mock';
import { mockRetningsnummereKodeverk } from './kodeverk/retningsnummer-mock';
import { mockTilrettelagtKommunikasjonKodeverk } from './kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';
import { mockPostnummere } from './kodeverk/postnummer-kodeverk-mock';
import { mockLandKodeverk } from './kodeverk/land-kodeverk-mock';
import { mockValutaKodeverk } from './kodeverk/valuta-kodeverk-mock';
import { mockVergemal } from './person/vergemal/vergemalMock';
import { getMockUtbetalinger } from './utbetalinger/utbetalinger-mock';
import { getMockSykepengerRespons } from './ytelse/sykepenger-mock';
import { getMockForeldrepenger } from './ytelse/foreldrepenger-mock';
import { getMockPleiepenger } from './ytelse/pleiepenger-mock';
import { mockFeatureToggle } from './featureToggle-mock';
import { getMockSaksoversikt } from './saksoversikt/saksoversikt-mock';
import { getMockOppfølging, getMockYtelserOgKontrakter } from './oppfolging-mock';
import { getDittNavVarsler, getMockVarsler } from './varsler/varsel-mock';
import { getMockSlaaSammen } from './meldinger/meldinger-mock';
import { getForeslattEnhet, getMockAnsatte, getMockEnheter, getMockGsakTema } from './meldinger/oppgave-mock';
import { getMockInnloggetSaksbehandler } from './innloggetSaksbehandler-mock';
import { gsakSaker, pesysSaker } from './journalforing/journalforing-mock';
import { mockPersonsokResponse, mockStaticPersonsokRequest } from './person/personsokMock';
import { setupWsControlAndMock } from './context-mock';
import standardTekster from './standardTeksterMock.js';
import { mockTilgangTilSlett } from './meldinger/merk-mock';
import { MeldingerBackendMock } from './mockBackend/meldingerBackendMock';
import { getSaksBehandlersEnheterMock } from './getSaksBehandlersEnheterMock';
import { saksbehandlerCookieNavnPrefix } from '../redux/session/saksbehandlersEnhetCookieUtils';
import { OppgaverBackendMock } from './mockBackend/oppgaverBackendMock';
import { setupSaksbehandlerInnstillingerMock } from './saksbehandlerinnstillinger-mock';
import { failurerateMiddleware } from './utils/failureMiddleware';
import { setupDraftMock } from './draft-mock';
import tilgangskontrollMock from './tilgangskontroll-mock';

const STATUS_OK = () => 200;
const STATUS_BAD_REQUEST = () => 400;

const oppgaveBackendMock = new OppgaverBackendMock();
const meldingerBackendMock = new MeldingerBackendMock(oppgaveBackendMock);

export function randomDelay() {
    if (navfaker.random.vektetSjanse(0.05)) {
        return faker.random.number(5000);
    }
    return faker.random.number(750);
}

const fødselsNummerErGyldigStatus = (args: HandlerArgument) =>
    erGyldigFødselsnummer(args.pathParams.fodselsnummer) ? STATUS_OK() : STATUS_BAD_REQUEST();

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
        '/modiapersonoversikt-api/rest/tilgang/:fodselsnummer?',
        withDelayedResponse(
            randomDelay(),
            () => (Math.random() > 0.98 ? 400 : 200),
            mockGeneratorMedFødselsnummer(tilgangskontrollMock)
        )
    );
}

function setupPersonMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/person/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fødselsnummer => getPerson(fødselsnummer))
        )
    );
}

function setupEgenAnsattMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/egenansatt/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fødselsnummer => erEgenAnsatt(fødselsnummer))
        )
    );
}

function setupKontaktinformasjonMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/person/:fodselsnummer/kontaktinformasjon',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fødselsnummer => getMockKontaktinformasjon(fødselsnummer))
        )
    );
}

function setupSaksoversiktMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/saker/:fodselsnummer/sakstema',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(getMockSaksoversikt)
        )
    );
}

function setupUtbetalingerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/utbetaling/:fodselsnummer',
        withDelayedResponse(randomDelay(), fødselsNummerErGyldigStatus, args =>
            getMockUtbetalinger(args.pathParams.fodselsnummer, args.queryParams.startDato, args.queryParams.sluttDato)
        )
    );
}

function setupSykepengerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/ytelse/sykepenger/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockSykepengerRespons(fodselsnummer))
        )
    );
}

function setupForeldrepengerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/ytelse/foreldrepenger/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockForeldrepenger(fodselsnummer))
        )
    );
}

function setupPleiepengerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/ytelse/pleiepenger/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockPleiepenger(fodselsnummer))
        )
    );
}

function setupOppfølgingMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/oppfolging/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockOppfølging(fodselsnummer))
        )
    );
}

function setupYtelserOgKontrakter(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/oppfolging/:fodselsnummer/ytelserogkontrakter',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockYtelserOgKontrakter(fodselsnummer))
        )
    );
}

function setupVarselMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/varsler/:fodselsnummer',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockVarsler(fodselsnummer))
        )
    );

    const dittnaveventHandler: MockHandler = ({ init }) => {
        const headers: any = init?.headers;
        const fnr = headers.fodselsnummer;
        if (!erGyldigFødselsnummer(fnr)) {
            return Promise.resolve({ status: 400 });
        }
        return Promise.resolve({ status: 200, body: JSON.stringify(getDittNavVarsler(fnr)) });
    };

    mock.get('/dittnav-eventer-modia/fetch/beskjed/all', ResponseUtils.delayed(randomDelay(), dittnaveventHandler));
    mock.get('/dittnav-eventer-modia/fetch/oppgave/all', ResponseUtils.delayed(randomDelay(), dittnaveventHandler));
}

function setupMeldingerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/dialog/:fodselsnummer/meldinger',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => meldingerBackendMock.getMeldinger(fodselsnummer))
        )
    );
}

function setupSlaasammenMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/slaasammen',
        withDelayedResponse(
            randomDelay(),
            STATUS_OK,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockSlaaSammen(fodselsnummer))
        )
    );
}

function setupGsakTemaMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/dialogoppgave/tema',
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
        apiBaseUri + '/enheter/oppgavebehandlere/foreslatte',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getForeslattEnhet())
    );
}

function setupAnsattePaaEnhetMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/enheter/:enhetId/ansatte',
        withDelayedResponse(
            randomDelay(),
            STATUS_OK,
            mockGeneratorMedEnhetId(enhetId => getMockAnsatte(enhetId))
        )
    );
}

function setupTilgangTilSlettMock(mock: FetchMock) {
    mock.get(
        `${apiBaseUri}/dialogmerking/slett`,
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockTilgangTilSlett())
    );
}

function setupGeografiskTilknytningMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/enheter',
        withDelayedResponse(
            randomDelay(),
            (args: HandlerArgument) => {
                if (isNaN(args.queryParams.gt) && !args.queryParams.dkode) {
                    return 404;
                } else {
                    return 200;
                }
            },
            (args: HandlerArgument) => getMockNavKontor(args.queryParams.gt, args.queryParams.dkode)
        )
    );
}

function setupPersonsokMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/personsok',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPersonsokResponse(mockStaticPersonsokRequest()))
    );
}

function setSaksbehandlerinnstillingerMockBackend(args: HandlerArgument) {
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
        withDelayedResponse(randomDelay(), STATUS_OK, () => oppgaveBackendMock.plukkOppgave())
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

function setupSendDelsvarMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fnr/delvis-svar',
        withDelayedResponse(randomDelay(), STATUS_OK, request => {
            meldingerBackendMock.sendDelsvar(request.body);
            return {};
        })
    );
}

function setupTildelteOppgaverMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/oppgaver/tildelt',
        withDelayedResponse(randomDelay(), STATUS_OK, () => oppgaveBackendMock.getTildelteOppgaver())
    );
}

function setupLeggTilbakeOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/oppgaver/legg-tilbake',
        withDelayedResponse(randomDelay(), STATUS_OK, request => oppgaveBackendMock.leggTilbake(request.body))
    );
}

function setupSendReferatMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendreferat',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, request => {
            meldingerBackendMock.sendReferat(request.body);
            return {};
        })
    );
}

function setupSendSpørsmålMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendsporsmal',
        withDelayedResponse(randomDelay() * 2, STATUS_OK, request => {
            meldingerBackendMock.sendSpørsmål(request.body);
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

function setupVergemalMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/person/:fodselsnummer/vergemal',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fødselsnummer => mockVergemal(fødselsnummer))
        )
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

function setupRetningsnummerKodeverkMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/kodeverk/Retningsnumre',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockRetningsnummereKodeverk())
    );
}

function setupTilrettelagtKommunikasjonKodeverkMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/kodeverk/TilrettelagtKommunikasjon',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockTilrettelagtKommunikasjonKodeverk())
    );
}

function setupPostnummerKodeverk(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/kodeverk/Postnummer',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockPostnummere())
    );
}

function setupLandKodeverk(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/kodeverk/Landkoder',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockLandKodeverk())
    );
}

function setupValutaKodeverk(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/kodeverk/Valutaer',
        withDelayedResponse(randomDelay(), STATUS_OK, () => mockValutaKodeverk())
    );
}

function setupJournalforingMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/journalforing/:fnr/saker/sammensatte',
        withDelayedResponse(randomDelay(), STATUS_OK, () => gsakSaker)
    );
    mock.get(
        apiBaseUri + '/journalforing/:fnr/saker/pensjon',
        withDelayedResponse(randomDelay(), STATUS_OK, () => pesysSaker)
    );
    mock.post(
        apiBaseUri + '/journalforing/:fnr/:traadId',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function opprettOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogoppgave/opprett',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function merkAvsluttMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/avslutt',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
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

function setupAvsluttOppgaveGosysMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialogmerking/avsluttgosysoppgave',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
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
setupPersonMock(mock);
setupTilgangskontroll(mock);
setupEgenAnsattMock(mock);
setupKontaktinformasjonMock(mock);
setupGeografiskTilknytningMock(mock);
setupSaksoversiktMock(mock);
setupUtbetalingerMock(mock);
setupSykepengerMock(mock);
setupForeldrepengerMock(mock);
setupPleiepengerMock(mock);
setupOppgaveMock(mock);
setupOpprettHenvendelseMock(mock);
setupFerdigstillHenvendelseMock(mock);
setupSendDelsvarMock(mock);
setupTildelteOppgaverMock(mock);
setupLeggTilbakeOppgaveMock(mock);
setupVergemalMock(mock);
setupBaseUrlsMock(mock);
setupFeatureToggleMock(mock);
setupVeilederRollerMock(mock);
setupRetningsnummerKodeverkMock(mock);
setupTilrettelagtKommunikasjonKodeverkMock(mock);
setupPostnummerKodeverk(mock);
setupWsControlAndMock(mock);
setupLandKodeverk(mock);
setupValutaKodeverk(mock);
setupOppfølgingMock(mock);
setupMeldingerMock(mock);
setupGsakTemaMock(mock);
setupOppgaveEnhetMock(mock);
setupForeslatteEnheterMock(mock);
setupAnsattePaaEnhetMock(mock);
setupTilgangTilSlettMock(mock);
setupYtelserOgKontrakter(mock);
setupVarselMock(mock);
opprettOppgaveMock(mock);
setupSendReferatMock(mock);
setupSendSpørsmålMock(mock);
setupSendSvarMock(mock);
setupPersonsokMock(mock);
merkAvsluttMock(mock);
merkBidragMock(mock);
merkFeilsendtMock(mock);
merkKontorsperretMock(mock);
merkSlettMock(mock);
setupJournalforingMock(mock);
setupStandardteksterMock(mock);
setupSlaasammenMock(mock);
setupVelgEnhetMock(mock);
setUpSaksbehandlersEnheterMock(mock);
setupAvsluttOppgaveGosysMock(mock);
setupSaksbehandlerInnstillingerMock(mock);
setupDraftMock(mock);
