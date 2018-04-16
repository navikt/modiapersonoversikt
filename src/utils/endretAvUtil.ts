export function endretAvTekst(rawString: string): string {
    if (rawString.match('[0-9]{7} BD03') || rawString.match('[0-9]{7} PP01')) {
        return 'av bruker';
    } else if (rawString.match('[A-Z]{1}[0-9]{6} BD06') || rawString.match('[A-Z]{1}[0-9]{6} PP01') ) {
        return 'av NAV';
    } else if (rawString.match('SKD')) {
        return 'i Folkeregisteret';
    } else {
        return rawString;
    }
}