import { apiBaseUri, mockEnabled } from '../api/config';
import { mockSaksdokument } from '../mock/saksoversikt/dokument-mock';

export function getSaksdokument(fnr: string, journalpostId: string, dokumentreferanse: string) {
    if (mockEnabled) {
        return mockSaksdokument();
    } else {
        return apiBaseUri + '/saker/' + fnr + '/dokument/' + journalpostId + '/' + dokumentreferanse;
    }
}

interface ValuePairs {
    [name: string]: string | undefined;
}

export function parseQueryParams(queryString: string): ValuePairs {
    return queryString
        .replace(/[?]/g, '')
        .split('&')
        .reduce((acc, value: string) => ({...acc, [value.split('=')[0]]: value.split('=')[1]}), {});
}