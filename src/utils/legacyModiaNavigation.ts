export function getNyModiaRedirect(
    pathname: string,
    search: { traadId?: string; dokument?: string; journalpost?: string },
    harAktivBruker: boolean
) {
    if (!harAktivBruker) {
        return { to: '/new' as const, search: {} };
    }
    const pathnameMatch = pathname.replace(/\/+$/, '');
    if (pathnameMatch === '/person/meldinger') {
        return { to: '/new/person/meldinger' as const, search: { traadId: search.traadId } };
    } else if (pathnameMatch === '/person/oppfolging') {
        return { to: '/new/person/oppfolging' as const, search: {} };
    } else if (/person\/utbetaling/.test(pathnameMatch)) {
        return { to: '/new/person/utbetaling' as const, search: {} };
    } else if (pathnameMatch === '/person/ytelser') {
        return { to: '/new/person/ytelser' as const, search: {} };
    } else if (pathnameMatch === '/person/varsler') {
        return { to: '/new/person/varsler' as const, search: {} };
    } else if (pathnameMatch === '/person/saker' || pathnameMatch === '/saker') {
        return { to: '/new/person/dokumenter' as const, search: {} };
    } else if (pathnameMatch === '/dokument' && search.dokument) {
        return {
            to: '/new/dokument' as const,
            search: { dokument: search.dokument, journalpost: search.journalpost }
        };
    }
    return { to: '/new/person/hjem' as const, search: {} };
}
