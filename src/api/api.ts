import { postConfig } from './config';
import { loggError, loggEvent } from '../utils/logger/frontendLogger';
import { confirm } from '../components/popup-boxes/popup-boxes';

const CONFLICT = 409;

export async function post(uri: string, body: object | string, loggLocation: string): Promise<object> {
    loggEvent('Post', loggLocation);
    const response = await fetch(uri, postConfig(body));
    return handleResponse(response, loggLocation);
}

export class RespectConflictError extends Error {}

export async function postWithConflictVerification(
    uri: string,
    body: object | string,
    loggLocation: string,
    conflictMessage: string | undefined = 'Det oppstod en konflikt. Vil du overstyre?'
): Promise<object> {
    loggEvent('Post', loggLocation);
    const config = postConfig(body);
    let response = await fetch(uri, config);
    if (response.status === CONFLICT) {
        const message = await readConflictMessage(response, conflictMessage);
        if (await confirm({ icon: 'warning', header: 'Oppgave tilordning', message })) {
            config.headers['Ignore-Conflict'] = 'true';
            response = await fetch(uri, config);
        } else {
            throw new RespectConflictError();
        }
    }
    return handleResponse(response, loggLocation);
}

async function readConflictMessage(response: Response, fallbackMessage: string): Promise<string> {
    try {
        const json: any = response.clone().json();
        if (typeof json.message === 'string' && json.message.length > 0) {
            return json.message;
        } else {
            return fallbackMessage;
        }
    } catch (e) {
        return await response.clone().text();
    }
}

function handleResponse(response: Response, loggLocation: string): Promise<object> {
    // Ignore-Conflict
    if (!response.ok || response.redirected) {
        return parseError(response, loggLocation);
    }
    return parseResponse(response);
}

function parseResponse(response: Response): Promise<object> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    } else {
        return Promise.resolve({});
    }
}

async function parseError(response: Response, loggLocation: string): Promise<object> {
    const text = await response.text();
    loggError(
        Error(`Post failed in ${loggLocation} on: ${response.url}`),
        undefined,
        {},
        {
            action: 'Post-Failed',
            location: loggLocation
        }
    );
    return Promise.reject(text);
}
