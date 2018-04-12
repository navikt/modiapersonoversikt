import { apiBaseUri } from '../api/config';
import { getPerson } from './person-mock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument, ResponseUtils } from 'yet-another-fetch-mock';
import { getKontaktinformasjon } from './kontaktinformasjon-mock';

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: (requestArgs, response) => {
            return response;
        }
    });

    mock.get(apiBaseUri + '/person/:fodselsnummer', ResponseUtils.delayed(800, (args: HandlerArgument) =>
        ResponseUtils.jsonPromise(getPerson(args.pathParams.fodselsnummer))));

    mock.get(
        apiBaseUri + '/person/:fodselsnummer/kontaktinformasjon',
        ResponseUtils.delayed(2000, (args: HandlerArgument) =>
            ResponseUtils.jsonPromise(getKontaktinformasjon(args.pathParams.fodselsnummer))));

    mock.post(apiBaseUri + '/oppgave/plukk', ResponseUtils.delayed(1200, () =>
        ResponseUtils.jsonPromise(getTilfeldigeOppgaver())));
}