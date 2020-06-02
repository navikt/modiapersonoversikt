import { apiBaseUri } from '../../../../../api/config';

export function getSaksdokumentUrl(fnr: string, journalpostId: string, dokumentreferanse: string) {
    return apiBaseUri + '/saker/' + fnr + '/dokument/' + journalpostId + '/' + dokumentreferanse;
}
