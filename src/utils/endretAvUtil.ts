export function endretAvTekst(rawString: string): string {
    if (endretAvBruker(rawString) || endretIPSelv(rawString)) {
        return 'av bruker';
    } else if (endretIFagsystem(rawString) || endretIPesys(rawString) ) {
        return 'av NAV';
    } else if (rawString.match('SKD')) {
        return 'i Folkeregisteret';
    } else {
        return rawString;
    }
}

function endretIFagsystem(rawString: string) {
    return rawString.match('[A-Z][0-9]{6}');
}

function endretIPSelv(rawString: string) {
    return rawString.match('Srvpsel');
}

function endretIPesys(rawString: string) {
    return rawString.match('srvPensjon');
}

function endretAvBruker(rawString: string) {
    return rawString.match('[0-9]{7}');
}