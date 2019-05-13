import { postConfig } from './config';

export function post(uri: string, body: object) {
    return fetch(uri, postConfig(body)).then(response => {
        if (response.ok && !response.redirected) {
            return parseResponse(response);
        } else {
            throw response.statusText;
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
