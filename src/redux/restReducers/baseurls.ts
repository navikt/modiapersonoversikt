import { createActionsAndReducerDeprecated } from './deprecatedRestResource';
import { getBaseUrls } from '../../api/baseurls-api';
import { BaseUrl, BaseUrlsResponse } from '../../models/baseurls';

const { reducer, action, actionNames } = createActionsAndReducerDeprecated('baseurls');

export function hentBaseUrls() {
    return action(() => getBaseUrls());
}

export function hentBaseUrl(baseUrlsResponse: BaseUrlsResponse, key: string) {
    const resultUrl = baseUrlsResponse.baseUrls.find((baseUrl: BaseUrl) => {
        return baseUrl.key === key;
    });

    if (resultUrl) {
        return resultUrl.url;
    }
    return '';
}

export { actionNames };
export default reducer;
