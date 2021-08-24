export function getAktorId(fodselsnummer: string): string | null {
    return `000${fodselsnummer}000`;
}
