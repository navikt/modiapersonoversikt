import * as faker from 'faker/locale/nb_NO';

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
import { getMockSykepenger } from './ytelse/sykepenger-mock';
import { getMockForeldrepenger } from './ytelse/foreldrepenger-mock';
import { getMockPleiepenger } from './ytelse/pleiepenger-mock';
import { getMockSaksoversikt } from './saksoversikt/saksoversikt-mock';

const STATUS_OK = () => 200;

function randomDelay() {
    if (navfaker.random.vektetSjanse(0.05)) {
        return faker.random.number(8000);
    }
    return faker.random.number(1500);
}

function setupPersonMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/person/:fodselsnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getPerson(fødselsnummer))));
}

function setupEgenAnsattMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/egenansatt/:fodselsnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => erEgenAnsatt(fødselsnummer))));
}

function setupKontaktinformasjonMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/person/:fodselsnummer/kontaktinformasjon', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getMockKontaktinformasjon(fødselsnummer))));
}

function setupSaksoversiktMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/saksoversikt/:fodselsnummer/sakstema', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getMockSaksoversikt(fødselsnummer))
    ));
}

function setupUtbetalingerMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/utbetaling/:fodselsnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fodselsnummer => getMockUtbetalinger(fodselsnummer))));
}

function setupSykepengerMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/ytelse/sykepenger/:fodselsnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fodselsnummer => getMockSykepenger(fodselsnummer))));
}

function setupForeldrepengerMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/ytelse/foreldrepenger/:fodselsnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fodselsnummer => getMockForeldrepenger(fodselsnummer))));
}

function setupPleiepengerMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/ytelse/pleiepenger/:fodselsnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fodselsnummer => getMockPleiepenger(fodselsnummer))));
}

function setupGeografiskTilknytningMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/enheter', withDelayedResponse(
        randomDelay(),
        (args: HandlerArgument) => {
            if (isNaN(args.queryParams.gt) && !args.queryParams.dkode) {
                return 404;
            } else {
                return 200;
            }
        },
        (args: HandlerArgument) => getMockNavKontor(args.queryParams.gt, args.queryParams.dkode)));
}

function setupOppgaveMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/oppgaver/plukk/:temagruppe', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => getTilfeldigeOppgaver()));
}

function endreNavnMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/navn', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => {return undefined; }));
}

function endreNavKontaktinformasjonMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/telefonnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => ({})
    ));
}

function setupEndreAdresseMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/adresse', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => ({})
    ));
}

function setupEndreKontonummerMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/kontonummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => ({})
    ));
}

function endreTilrettelagtKommunikasjonnMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/tilrettelagtkommunikasjon', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => {return {}; }));
}

function setupVergemalMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/person/:fodselsnummer/vergemal', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => mockVergemal(fødselsnummer))));
}

function setupBaseUrlsMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/baseurls', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => {return mockBaseUrls(); }));
}

function setupVeilederRollerMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/veileder/roller', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => getMockVeilederRoller()));
}

function setupRetningsnummerKodeverkMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/Retningsnumre', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => mockRetningsnummereKodeverk()));
}

function setupTilrettelagtKommunikasjonKodeverkMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/TilrettelagtKommunikasjon', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => mockTilrettelagtKommunikasjonKodeverk()));
}

function setupPostnummerKodeverk(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/Postnummer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => mockPostnummere()));
}

function setupLandKodeverk(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/Landkoder', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => mockLandKodeverk()));
}

function setupValutaKodeverk(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/Valutaer', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => mockValutaKodeverk()));
}

function setupNavigasjonsmenyMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/hode/me', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => ({
            'ident': 'z123445',
            'fornavn': 'Nils',
            'etternavn': 'Saksbehandler',
            'navn': 'Nils Saksbehandler'
        })
    ));

    mock.get(apiBaseUri + '/hode/enheter', withDelayedResponse(
        randomDelay(),
        STATUS_OK,
        () => ({
            enhetliste: [{
                'navn': 'NAV Oslo',
                'enhetId': '1220'
            }]
        })
    ));
}

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware:  MiddlewareUtils.combine(
            (requestArgs, response) => {
                return response;
            },
            MiddlewareUtils.failurerateMiddleware(0.02))
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
}
