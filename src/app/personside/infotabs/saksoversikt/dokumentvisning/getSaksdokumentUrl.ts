import { apiBaseUri, mockEnabled } from '../../../../../api/config';
import { mockSaksdokumentUrl } from '../../../../../mock/saksoversikt/dokument-mock';

export function getSaksdokumentUrl(fnr: string, journalpostId: string, dokumentreferanse: string) {
    if (mockEnabled) {
        return mockSaksdokumentUrl;
    } else {
        return apiBaseUri + '/saker/' + fnr + '/dokument/' + journalpostId + '/' + dokumentreferanse;
    }
}
