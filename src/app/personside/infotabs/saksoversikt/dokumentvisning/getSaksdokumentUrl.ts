import { apiBaseUri } from '../../../../../api/config';

export function getSaksdokumentUrl(
    fnr: string,
    journalpostId?: string | null | undefined,
    dokumentreferanse?: string | null | undefined
) {
    return apiBaseUri + '/saker/' + fnr + '/dokument/' + journalpostId + '/' + dokumentreferanse;
}
