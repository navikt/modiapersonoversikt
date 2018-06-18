import { apiBaseUri } from './config';
import { BaseUrlsResponse } from '../models/baseurls';

export function getBaseUrls(): Promise<BaseUrlsResponse> {
    const uri =
        `${apiBaseUri}/baseurls`;
    return fetch(uri, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response.statusText;
            }
        });
}
