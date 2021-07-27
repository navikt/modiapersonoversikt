import { apiBaseUri } from '../../../../../api/config';

export function getSaksdokumentUrl(fnr: string, journalpostId: string | null, dokumentreferanse: string | null) {
    return apiBaseUri + '/saker/' + fnr + '/dokument/' + journalpostId + '/' + dokumentreferanse;
}
