import { postConfig } from './config';

export function post(uri: string, body: object) {
    return fetch(uri, postConfig(body)).then(response => {
        if (response.ok && !response.redirected) {
            return response.json();
        } else {
            throw response.statusText;
        }
    });
}
