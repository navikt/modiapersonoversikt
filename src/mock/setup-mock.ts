import { apiBaseUri } from '../api/config';
import { getPerson } from './person-mock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock from 'yet-another-fetch-mock';
import { getKontaktinformasjon } from './kontaktinformasjon-mock';
import { mockGeneratorMedFødselsnummer, withDelayedResponse } from './utils';

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
        2000,
        true,
        mockGeneratorMedFødselsnummer(fødselsnummer => getKontaktinformasjon(fødselsnummer))));

    mock.post(apiBaseUri + '/oppgave/plukk', withDelayedResponse(
        1200,
        true,
        () => getTilfeldigeOppgaver()));
}
