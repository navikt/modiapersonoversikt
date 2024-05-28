import { includeCredentials, postConfig } from './config';
import { loggError, loggEvent, loggWarning } from '../utils/logger/frontendLogger';
import { confirm } from '../components/popup-boxes/popup-boxes';

const CONFLICT = 409;
export class FetchError extends Error {
    constructor(
        public response: Response,
        message?: string
    ) {
        super(message);
    }
}
export async function get<TYPE extends object>(uri: string): Promise<TYPE> {
    const response = await fetch(uri, includeCredentials);
    if (!response.ok || response.redirected) {
        throw new FetchError(response, `${response.status} ${response.statusText}: ${uri}`);
    } else {
        return handleResponse(response);
    }
}
export async function post<TYPE extends object = object>(
    uri: string,
    body: object | string,
    loggLocation?: string
): Promise<TYPE> {
    const response = await fetch(uri, postConfig(body));
    return handleResponse<TYPE>(response, loggLocation);
}

export class RespectConflictError extends Error {}

export async function postWithConflictVerification<TYPE extends object = object>(
    uri: string,
    body: object | string,
    loggLocation: string,
    conflictMessage: string = 'Det oppstod en konflikt. Vil du overstyre?'
): Promise<TYPE> {
    loggEvent('Post', loggLocation);
    const config = postConfig(body);
    let response = await fetch(uri, config);
    if (response.status === CONFLICT) {
        if (await confirm({ icon: 'warning', header: 'Oppgave tilordning', message: conflictMessage })) {
            config.headers['Ignore-Conflict'] = 'true';
            response = await fetch(uri, config);
        } else {
            throw new RespectConflictError();
        }
    }
    return handleResponse(response, loggLocation);
}

function handleResponse<TYPE extends object = object>(
    response: Response,
    loggLocation: string | undefined = undefined
): Promise<TYPE> {
    // Ignore-Conflict
    if (!response.ok || response.redirected) {
        return parseError<TYPE>(response, loggLocation);
    }
    return parseResponse<TYPE>(response);
}

function parseResponse<TYPE>(response: Response): Promise<TYPE> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    } else if (contentType && contentType.indexOf('text/plain') !== -1) {
        return response.text() as Promise<TYPE>;
    } else {
        loggWarning(new Error(`Unknown Content-Type: ${contentType}. Not sure what to do with response.`));
        return Promise.resolve({} as TYPE);
    }
}

async function parseError<TYPE extends object = object>(
    response: Response,
    loggLocation: string | undefined
): Promise<TYPE> {
    const text = await response.text();
    loggError(
        new Error(`Post failed in ${loggLocation ?? 'unknown'} on: ${response.url}`),
        undefined,
        {},
        {
            action: 'Post-Failed',
            location: loggLocation
        }
    );
    throw new FetchError(response, text);
}
