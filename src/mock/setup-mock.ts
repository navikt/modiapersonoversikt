import { apiBaseUri } from '../api/config';
import { getPerson } from './person-mock';
import { getTilfeldigeOppgaver } from './oppgave-mock';
import FetchMock, { HandlerArgument, ResponseUtils } from 'yet-another-fetch-mock';

export function setupMock() {
    console.log('### MOCK ENABLED! ###');
    /* tslint:disable-next-line */

    const mock = FetchMock.configure({
        enableFallback: true,
        middleware: (requestArgs, response) => {
            return response;
        }
    });

    mock.get(apiBaseUri + '/person/:fodselsnummer', ResponseUtils.delayed(1200, (args: HandlerArgument) =>
        ResponseUtils.jsonPromise(getPerson(args.pathParams.fodselsnummer))));

    mock.post(apiBaseUri + '/oppgave/plukk', ResponseUtils.delayed(1200, () =>
        ResponseUtils.jsonPromise(getTilfeldigeOppgaver())));
}