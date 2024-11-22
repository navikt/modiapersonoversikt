import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { FetchError } from 'src/api/api';
import { apiBaseUriWithoutRest } from 'src/api/config';
import type { paths } from 'src/generated/modiapersonoversikt-api';

export const personoversiktApiClient = createFetchClient<paths>({
    baseUrl: apiBaseUriWithoutRest,
    credentials: 'include',
    mode: 'cors',
    redirect: 'follow',
    headers: {
        'content-type': 'application/json'
    }
});

personoversiktApiClient.use({
    onResponse: async ({ response, request }) => {
        if (!response.ok) {
            throw new FetchError(
                response,
                (await response.text()) ?? `${response.status}: ${request.url}`,
                response.headers.get('traceid') ?? undefined
            );
        }
    }
});

export const $api = createClient(personoversiktApiClient);
