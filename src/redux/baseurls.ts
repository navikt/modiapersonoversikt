import { createActionsAndReducer } from './restReducer';
import { getBaseUrls } from '../api/baseurls-api';
import { BaseUrlsResponse } from '../models/baseurls';

const { reducer, action, actionNames } = createActionsAndReducer('baseurls');

export function hentBaseUrls() {
    return action(() => getBaseUrls());
}

export function hentBaseUrl(baseUrlsResponse?: BaseUrlsResponse, key?: string) {
    var url = '';
    if (baseUrlsResponse) {
        baseUrlsResponse.baseUrls.forEach(baseUrl => {
            if (baseUrl.key === key) {
                url = baseUrl.url;
            }

        });
    }
    return url;
}

export { actionNames };
export default reducer;