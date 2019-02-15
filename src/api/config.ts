import * as Cookies from 'js-cookie';

declare var _apiBaseUri: string;
declare var _mockEnabled: string;

function getApiBaseUri() {
    if (typeof _apiBaseUri === 'undefined') {
        return '/modiabrukerdialog/rest';
    } else {
        return _apiBaseUri;
    }
}

function getMockEnabled(): boolean {
    if (typeof _mockEnabled === 'undefined') {
        return false;
    } else {
        return _mockEnabled === 'true';
    }
}

function getXsrfToken() {
    const cookie = Cookies.get('XSRF-TOKEN');
    if (cookie) {
        return cookie.valueOf();
    }
    return '';
}

export function postConfig(body: object) {
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

export function postXSRFConfig(body: object) {
    return {
        body: JSON.stringify(body),
        cache: 'no-cache' as RequestCache,
        credentials: 'include' as RequestCredentials,
        headers: {
            'content-type': 'application/json',
            'X-XSRF-TOKEN': getXsrfToken()
        },
        method: 'POST',
        mode: 'cors' as RequestMode,
        redirect: 'follow' as RequestRedirect
    };
}

export const apiBaseUri = getApiBaseUri();

export const mockEnabled = getMockEnabled();
