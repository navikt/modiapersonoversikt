import { postConfig } from './config';
import { loggError, loggEvent } from '../utils/frontendLogger';

export function post(uri: string, body: object | string, loggLocation: string) {
    loggEvent('Post', loggLocation);
    return fetch(uri, postConfig(body)).then(response => {
        if (response.ok && !response.redirected) {
            return parseResponse(response);
        } else {
            return response.text().then(text => {
                loggEvent('Post-failed', loggLocation);
                loggError(Error(`Post failed in ${loggLocation} on: ${uri}`), text, { request: body });
                return Promise.reject(text);
            });
        }
    });
}

function parseResponse(response: Response): Promise<object> {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json();
    } else {
        return Promise.resolve({});
    }
}
