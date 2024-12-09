export function getSaksdokumentUrl(journalpostId: string | null, dokumentreferanse: string | null) {
    return `journalpost=${journalpostId}&dokument=${dokumentreferanse}`;
}
