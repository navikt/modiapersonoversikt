import { createActionsAndReducer } from './restReducer';
import { getBaseUrls } from '../api/baseurls-api';
import { BaseUrl, BaseUrlsResponse } from '../models/baseurls';

const { reducer, action, actionNames } = createActionsAndReducer('baseurls');

export function hentBaseUrls() {
    return action(() => getBaseUrls());
}

export function hentBaseUrl(baseUrlsResponse: BaseUrlsResponse, key: string) {
    const baseUrl = baseUrlsResponse.baseUrls.find((baseUrl : BaseUrl) => {
        return baseUrl.key === key;
    });

    if(baseUrl) {
        return baseUrl.url;
    }
    return '';
}

export { actionNames };
export default reducer;