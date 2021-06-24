import { BaseUrlsResponse } from '../models/baseurls';

export function mockBaseUrls(): BaseUrlsResponse {
    return {
        baseUrls: [
            {
                key: 'norg2-frontend',
                url: 'https://norg2-frontend.nais.preprod.local'
            },
            {
                key: 'personforvalter',
                url: 'https://pdl-web.dev.intern.nav.no/'
            },
            {
                key: 'drek',
                url: 'https://drek.nais.preprod.local/'
            }
        ]
    };
}
