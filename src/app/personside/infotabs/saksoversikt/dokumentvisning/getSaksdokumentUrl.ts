export function getSaksdokumentUrl(fnr: string, journalpostId: string | null, dokumentreferanse: string | null) {
    return `journalpost=${journalpostId}&dokument=${dokumentreferanse}`;
}
