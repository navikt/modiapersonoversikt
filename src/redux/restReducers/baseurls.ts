import { BaseUrl, BaseUrlsResponse } from '../../models/baseurls';
import { apiBaseUri } from '../../api/config';
import { createRestResourceReducerAndActions } from '../../rest/utils/restResource';
import { loggError } from '../../utils/frontendLogger';

export function hentBaseUrl(baseUrlsResponse: BaseUrlsResponse, key: string) {
    const resultUrl = baseUrlsResponse.baseUrls.find((baseUrl: BaseUrl) => {
        return baseUrl.key === key;
    });
    if (!resultUrl) {
        loggError(new Error('Kunne ikke finne base-url for: ' + key), undefined, {
            baseurls: baseUrlsResponse.baseUrls
        });
        return '';
    }
    return resultUrl.url;
}

export default createRestResourceReducerAndActions<BaseUrlsResponse>('baseurls', () => `${apiBaseUri}/baseurls`);
