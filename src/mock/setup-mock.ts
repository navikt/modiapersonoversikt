import { apiBaseUri } from '../api/config';
import { getPerson } from './person/person-mock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument } from 'yet-another-fetch-mock';
import { getKontaktinformasjon } from './kontaktinformasjon-mock';
import { mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils';
import { getMockNavKontor } from './navkontor-mock';

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: (requestArgs, response) => {
            return response;
        }
    });

    mock.get(apiBaseUri + '/person/:fodselsnummer', withDelayedResponse(
        800,
        true,
        mockGeneratorMedFødselsnummer(fødselsnummer => getPerson(fødselsnummer))));

    mock.get(apiBaseUri + '/person/:fodselsnummer/kontaktinformasjon', withDelayedResponse(
        5000,
        true,
        mockGeneratorMedFødselsnummer(fødselsnummer => getKontaktinformasjon(fødselsnummer))));

    mock.get(apiBaseUri + '/enheter/geo/:geografiskTilknytning', withDelayedResponse(
        2000,
        true,
        (args: HandlerArgument) => getMockNavKontor(args.pathParams.geografiskTilknytning)));

    mock.post(apiBaseUri + '/oppgave/plukk', withDelayedResponse(
        1200,
        true,
        () => getTilfeldigeOppgaver()));
}
