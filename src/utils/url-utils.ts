import { apiBaseUri, mockEnabled } from '../api/config';
import { mockSaksdokument } from '../mock/saksoversikt/dokument-mock';

export function getSaksdokument(journalpostId: string, dokumentreferanse: string) {
    if (mockEnabled) {
        return mockSaksdokument();
    } else {
        return apiBaseUri + '/saker/dokument/' + journalpostId + '/' + dokumentreferanse;
    }
}