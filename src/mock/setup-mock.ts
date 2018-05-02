import { apiBaseUri } from '../api/config';
import { getPerson } from './person/personMock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument } from 'yet-another-fetch-mock';
import { getMockKontaktinformasjon } from './kontaktinformasjon-mock';
import { mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils/fetch-utils';
import { getMockNavKontor } from './navkontor-mock';
import { erEgenAnsatt } from './egenansatt-mock';
import { mockVergemal } from './vergemal-mock';

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
        5000,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getMockKontaktinformasjon(fødselsnummer))));
}

function setupGeografiskTilknytningMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/enheter/geo/:geografiskTilknytning', withDelayedResponse(
        2000,
        (args: HandlerArgument) => {
            if (isNaN(args.pathParams.geografiskTilknytning)) {
                return 404;
            } else {
                return 200;
            }
        },
        (args: HandlerArgument) => getMockNavKontor(args.pathParams.geografiskTilknytning)));
}

function setupOppgaveMock(mock: FetchMock) {
    mock.post(apiBaseUri + '/oppgave/plukk', withDelayedResponse(
        1200,
        STATUS_OK,
        () => getTilfeldigeOppgaver()));
}

function setupVergemalMock(mock: FetchMock) {
    mock.get(apiBaseUri + '/vergemal/:fodselsnummer', withDelayedResponse(
        2500,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => mockVergemal(fødselsnummer))));
}

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: (requestArgs, response) => {
            return response;
        }
    });

    setupPersonMock(mock);
    setupEgenAnsattMock(mock);
    setupKontaktinformasjonMock(mock);
    setupGeografiskTilknytningMock(mock);
    setupOppgaveMock(mock);
    setupVergemalMock(mock);
}
