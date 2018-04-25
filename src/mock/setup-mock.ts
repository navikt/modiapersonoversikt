import { apiBaseUri } from '../api/config';
import { getPerson } from './person/personMock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument } from 'yet-another-fetch-mock';
import { getKontaktinformasjon } from './kontaktinformasjon-mock';
import { mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils/fetch-utils';
import { getMockNavKontor } from './navkontor-mock';
import { erEgenAnsatt } from './egenansatt-mock';

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: (requestArgs, response) => {
            return response;
        }
    });

    const STATUS_OK = () => 200;

    mock.get(apiBaseUri + '/person/:fodselsnummer', withDelayedResponse(
        800,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getPerson(fødselsnummer))));

    mock.get(apiBaseUri + '/egenansatt/:fodselsnummer', withDelayedResponse(
        50,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => erEgenAnsatt(fødselsnummer))));

    mock.get(apiBaseUri + '/person/:fodselsnummer/kontaktinformasjon', withDelayedResponse(
        5000,
        STATUS_OK,
        mockGeneratorMedFødselsnummer(fødselsnummer => getKontaktinformasjon(fødselsnummer))));

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

    mock.post(apiBaseUri + '/oppgave/plukk', withDelayedResponse(
        1200,
        STATUS_OK,
        () => getTilfeldigeOppgaver()));
}
