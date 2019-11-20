import { postConfig } from './config';
import { loggError } from '../utils/frontendLogger';

export function post(uri: string, body: object) {
    return fetch(uri, postConfig(body)).then(response => {
        if (response.ok && !response.redirected) {
            return parseResponse(response);
        } else {
            return response.text().then(text => {
                loggError(Error('Post failed on: ' + uri), text, { request: body });
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
