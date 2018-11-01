import { apiBaseUri, mockEnabled } from '../api/config';
import { mockSaksdokument } from '../mock/saksoversikt/dokument-mock';

export function getSaksdokument(fnr: string, journalpostId: string, dokumentreferanse: string) {
    if (mockEnabled) {
        return mockSaksdokument();
    } else {
        return apiBaseUri + '/saker/' + fnr + '/dokument/' + journalpostId + '/' + dokumentreferanse;
    }
}