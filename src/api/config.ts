export function postConfig(body?: object | string) {
    return {
        body: JSON.stringify(body),
        cache: 'no-cache' as RequestCache,
        credentials: 'include' as RequestCredentials,
        headers: {
            'content-type': 'application/json'
        } as Record<string, string>,
        method: 'POST',
        mode: 'cors' as RequestMode,
        redirect: 'follow' as RequestRedirect
    };
}

export const includeCredentials: RequestInit = { credentials: 'include' };

export const apiBaseUri = `${import.meta.env.BASE_URL}proxy/azure-api/rest`;
export const apiBaseUriWithoutRest = `${import.meta.env.BASE_URL}proxy/azure-api`;
export const contextHolderBaseUri = `${import.meta.env.BASE_URL}proxy/modiacontextholder/api`;
