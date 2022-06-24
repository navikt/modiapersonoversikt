export const FOLKEREGISTERET = 'SKD';

export function endretAvTekst(rawString: string): string {
    if (endretAvBruker(rawString) || endretIPSelv(rawString)) {
        return 'av bruker';
    } else if (
        endretIFagsystem(rawString) ||
        endretIPesys(rawString) ||
        endretIArena(rawString) ||
        endretAvKonvertItSystem(rawString)
    ) {
        return 'av NAV';
    } else if (rawString.match('AAA2101, SKD')) {
        return 'av Skatteetaten';
    } else if (endretIFolkeregisteret(rawString)) {
        return 'i Folkeregisteret';
    } else {
        return rawString;
    }
}

function endretIFolkeregisteret(rawString: string) {
    return (
        rawString.match(FOLKEREGISTERET) ||
        rawString.toLowerCase() === 'folkeregisteret' ||
        rawString.toLowerCase() === 'freg'
    );
}

function endretIFagsystem(rawString: string) {
    return rawString && (endretAvNyTypeIdent(rawString) || endretAvGammelTypeIdent(rawString));
}

function endretAvNyTypeIdent(rawString: string) {
    return rawString.toUpperCase().match('[A-Z][0-9]{6}');
}

function endretAvGammelTypeIdent(rawString: string) {
    return rawString.toUpperCase().match('[A-Z]{3}[0-9]{4}, [A-Z]{2}[0-9]{2}');
}

function endretIPSelv(rawString: string) {
    return rawString.match('Srvpsel');
}

function endretIArena(rawString: string) {
    return rawString.match(/arena/i);
}

function endretAvKonvertItSystem(rawString: string) {
    return rawString.match(/konvert, IT[0-9]{2}/i);
}

function endretIPesys(rawString: string) {
    return rawString.match('srvPensjon');
}

function endretAvBruker(rawString: string) {
    return rawString.match('[0-9]{7}');
}
