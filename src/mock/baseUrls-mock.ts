import { BaseUrlsResponse } from '../models/baseurls';

export function mockBaseUrls(): BaseUrlsResponse {
    return {
        baseUrls: [
            {
                key: 'norg2-frontend',
                url: 'https://norg2-frontend.nais.preprod.local'
            }
        ]
    };
}
