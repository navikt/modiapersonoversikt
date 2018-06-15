import { apiBaseUri } from '../api/config';
import { getPerson } from './person/personMock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument, MiddlewareUtils } from 'yet-another-fetch-mock';
import { getMockKontaktinformasjon } from './kontaktinformasjon-mock';
import { mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils/fetch-utils';
import { getMockNavKontor } from './navkontor-mock';
import { erEgenAnsatt } from './egenansatt-mock';
import { mockVergemal } from './vergemal-mocks';
import { mockBaseUrls } from './baseUrls-mock';
import { getMockVeilederRoller } from './veilderRoller-mock';
import { mockRetningsnummereKodeverk } from './kodeverk/retningsnummer-mock';
import { mockTilrettelagtKommunikasjonKodeverk } from './kodeverk/tilrettelagt-kommunikasjon-kodeverk-mock';

const STATUS_OK = () => 200;

function setupPersonMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/person/:fodselsnummer', withDelayedResponse(
        800,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getPerson(fødselsnummer))));
}

function setupEgenAnsattMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/egenansatt/:fodselsnummer', withDelayedResponse(
        50,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => erEgenAnsatt(fødselsnummer))));
}

function setupKontaktinformasjonMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/person/:fodselsnummer/kontaktinformasjon', withDelayedResponse(
        700,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getMockKontaktinformasjon(fødselsnummer))));
}

function setupGeografiskTilknytningMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/enheter', withDelayedResponse(
        2000,
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
    mock.post(apiBaseUri + '/oppgave/plukk', withDelayedResponse(
        1200,
        STATUS_OK,
        () => getTilfeldigeOppgaver()));
}

function endreNavnMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/navn', withDelayedResponse(
        1200,
        STATUS_OK,
        () => {return undefined; }));
}

function endreNavKontaktinformasjonMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/brukerprofil/:fodselsnummer/telefon', withDelayedResponse(
        1200,
        STATUS_OK,
        () => {return {}; }));
}

function setupVergemalMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/person/:fodselsnummer/vergemal', withDelayedResponse(
        2500,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => mockVergemal(fødselsnummer))));
}

function setupBaseUrlsMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/baseurls', withDelayedResponse(
        2500,
        STATUS_OK,
        () => {return mockBaseUrls(); }));
}

function setupVeilederRollerMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/veileder/roller', withDelayedResponse(
        700,
        STATUS_OK,
        () => getMockVeilederRoller()));
}

function setupRetningsnummerKodeverkMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/Retningsnumre', withDelayedResponse(
        700,
        STATUS_OK,
        () => mockRetningsnummereKodeverk()));
}

function setupTilrettelagtKommunikasjonKodeverkMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/kodeverk/TilrettelagtKommunikasjon', withDelayedResponse(
        3000,
        STATUS_OK,
        () => mockTilrettelagtKommunikasjonKodeverk()));
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
    setupOppgaveMock(mock);
    setupVergemalMock(mock);
    setupBaseUrlsMock(mock);
    endreNavnMock(mock);
    setupVeilederRollerMock(mock);
    setupRetningsnummerKodeverkMock(mock);
    setupTilrettelagtKommunikasjonKodeverkMock(mock);
    endreNavKontaktinformasjonMock(mock);
}
