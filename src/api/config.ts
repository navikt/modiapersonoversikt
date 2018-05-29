declare var _apiBaseUri: string;
declare var _mockEnabled: string;

function getApiBaseUri() {
    if (typeof _apiBaseUri === 'undefined') {
        return '/modiabrukerdialog/rest';
    } else {
        return _apiBaseUri;
    }
}

function getMockEnabled() {
    if (typeof _mockEnabled === 'undefined') {
        return 'false';
    } else {
        return _mockEnabled;
    }
}

export const apiBaseUri = getApiBaseUri();

export const mockEnabled = getMockEnabled();