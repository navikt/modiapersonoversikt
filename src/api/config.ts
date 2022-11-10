export function postConfig(body?: object | string) {
    return {
        body: JSON.stringify(body),
        cache: 'no-cache' as RequestCache,
        credentials: 'include' as RequestCredentials,
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors' as RequestMode,
        redirect: 'follow' as RequestRedirect
    };
}

export const includeCredentials: RequestInit = { credentials: 'include' };

// const useAzureAd = window.location.search.includes('azuread');
// export const apiBaseUri = useAzureAd ? '/modiapersonoversikt/proxy/azure-api' : '/modiapersonoversikt/proxy/api';
export const apiBaseUri = '/modiapersonoversikt-api/rest';
