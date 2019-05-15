import faker from 'faker/locale/nb_NO';

import { apiBaseUri } from '../api/config';
import { getPerson } from './person/personMock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument, MiddlewareUtils } from 'yet-another-fetch-mock';
import { getMockKontaktinformasjon } from './person/krrKontaktinformasjon/kontaktinformasjon-mock';
import { mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils/fetch-utils';
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
import { getMockUtbetalinger } from './utbetalinger-mock';
import navfaker from 'nav-faker';
import { getMockSykepengerRespons } from './ytelse/sykepenger-mock';
import { getMockForeldrepenger } from './ytelse/foreldrepenger-mock';
import { getMockPleiepenger } from './ytelse/pleiepenger-mock';
import { mockFeatureToggle } from './featureToggle-mock';
import { getMockSaksoversikt } from './saksoversikt/saksoversikt-mock';
import { erGyldigFødselsnummer } from 'nav-faker/dist/personidentifikator/helpers/fodselsnummer-utils';
import { getMockOppfølging, getMockYtelserOgKontrakter } from './oppfolging-mock';
import { getMockVarsler } from './varsler/varsel-mock';
import { getMockTraader } from './meldinger/meldinger-mock';

const STATUS_OK = () => 200;
const STATUS_BAD_REQUEST = () => 400;

function randomDelay() {
    if (navfaker.random.vektetSjanse(0.05)) {
        return faker.random.number(5000);
    }
    return faker.random.number(750);
}

const fødselsNummerErGyldigStatus = (args: HandlerArgument) =>
    erGyldigFødselsnummer(args.pathParams.fodselsnummer) ? STATUS_OK() : STATUS_BAD_REQUEST();

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
}

function setupMeldingerMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/meldinger/:fodselsnummer/traader',
        withDelayedResponse(
            randomDelay(),
            fødselsNummerErGyldigStatus,
            mockGeneratorMedFødselsnummer(fodselsnummer => getMockTraader(fodselsnummer))
        )
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

function setupOppgaveMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/oppgaver/plukk/:temagruppe',
        withDelayedResponse(randomDelay(), STATUS_OK, () => getTilfeldigeOppgaver())
    );
}

function endreNavnMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/brukerprofil/:fodselsnummer/navn',
        withDelayedResponse(randomDelay(), STATUS_OK, () => {
            return undefined;
        })
    );
}

function endreNavKontaktinformasjonMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/brukerprofil/:fodselsnummer/telefonnummer',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function setupEndreAdresseMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/brukerprofil/:fodselsnummer/adresse',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function setupEndreKontonummerMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/brukerprofil/:fodselsnummer/kontonummer',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({}))
    );
}

function endreTilrettelagtKommunikasjonnMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/brukerprofil/:fodselsnummer/tilrettelagtkommunikasjon',
        withDelayedResponse(randomDelay(), STATUS_OK, () => {
            return {};
        })
    );
}

function setupSendMeldingMock(mock: FetchMock) {
    mock.post(
        apiBaseUri + '/dialog/:fodselsnummer/sendmelding',
        withDelayedResponse(randomDelay() * 3, STATUS_OK, () => {
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

function setupNavigasjonsmenyMock(mock: FetchMock) {
    mock.get(
        apiBaseUri + '/hode/me',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({
            ident: 'z123445',
            fornavn: 'Nils',
            etternavn: 'Saksbehandler',
            navn: 'Nils Saksbehandler'
        }))
    );

    mock.get(
        apiBaseUri + '/hode/enheter',
        withDelayedResponse(randomDelay(), STATUS_OK, () => ({
            enhetliste: [
                {
                    navn: 'NAV Oslo',
                    enhetId: '1220'
                }
            ]
        }))
    );
}

let mockInitialised = false;
export function setupMock() {
    if (mockInitialised) {
        return;
    } else {
        mockInitialised = true;
    }
    console.log('### MOCK ENABLED! ###');

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: MiddlewareUtils.combine((requestArgs, response) => {
            return response;
        }, MiddlewareUtils.failurerateMiddleware(0.02))
    });

    setupPersonMock(mock);
    setupEgenAnsattMock(mock);
    setupKontaktinformasjonMock(mock);
    setupGeografiskTilknytningMock(mock);
    setupSaksoversiktMock(mock);
    setupUtbetalingerMock(mock);
    setupSykepengerMock(mock);
    setupForeldrepengerMock(mock);
    setupPleiepengerMock(mock);
    setupOppgaveMock(mock);
    setupVergemalMock(mock);
    setupBaseUrlsMock(mock);
    setupFeatureToggleMock(mock);
    endreNavnMock(mock);
    setupVeilederRollerMock(mock);
    setupRetningsnummerKodeverkMock(mock);
    setupEndreKontonummerMock(mock);
    setupTilrettelagtKommunikasjonKodeverkMock(mock);
    setupPostnummerKodeverk(mock);
    endreNavKontaktinformasjonMock(mock);
    setupEndreAdresseMock(mock);
    endreTilrettelagtKommunikasjonnMock(mock);
    setupNavigasjonsmenyMock(mock);
    setupLandKodeverk(mock);
    setupValutaKodeverk(mock);
    setupOppfølgingMock(mock);
    setupMeldingerMock(mock);
    setupYtelserOgKontrakter(mock);
    setupVarselMock(mock);
    setupSendMeldingMock(mock);
}
