import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { FetchError } from 'src/api/api';
import { apiBaseUri } from 'src/api/config';
import type { paths } from 'src/generated/modiapersonoversikt-api';

export const personoversiktApiClient = createFetchClient<paths>({
    baseUrl: apiBaseUri,
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow',
    headers: {
        'content-type': 'application/json'
    }
});

personoversiktApiClient.use({
    onRequest: ({ request }) => {
        return new Request(request.url.replace('/rest', ''), request.clone());
    }
});

personoversiktApiClient.use({
    onResponse: async ({ response, request }) => {
        if (!response.ok) {
            if (request.method === 'GET') {
                throw new FetchError(response, `${response.status}: ${request.url}`);
            } else {
                throw new FetchError(response, await response.text());
            }
        }
    }
});

export const $api = createClient(personoversiktApiClient);
