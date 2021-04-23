import { postConfig } from './config';
import { loggError, loggEvent } from '../utils/logger/frontendLogger';
import { confirm } from '../components/popup-boxes/popup-boxes';

const CONFLICT = 409;

export async function post(uri: string, body: object | string, loggLocation: string): Promise<object> {
    loggEvent('Post', loggLocation);
    const response = await fetch(uri, postConfig(body));
    return handleResponse(response, loggLocation);
}

export async function postWithConflictVerification(
    uri: string,
    body: object | string,
    loggLocation: string
): Promise<object> {
    loggEvent('Post', loggLocation);
    const config = postConfig(body);
    let response = await fetch(uri, config);
    if (response.status === CONFLICT) {
        const message = await response.text();
        if (await confirm(message)) {
            config.headers['Ignore-Conflict'] = 'true';
            response = await fetch(uri, config);
        }
    }
    return handleResponse(response, loggLocation);
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
