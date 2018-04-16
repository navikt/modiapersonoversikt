export function endretAvTekst(rawString: string): string {
    if (rawString.includes('BD03')) {
        return 'av bruker';
    } else if (rawString.includes('BD06')) {
        return 'av NAV';
    } else if (rawString.includes('SKD')) {
        return 'i Folkeregisteret';
    } else {
        return '';
    }
}