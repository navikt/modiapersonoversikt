export function getNyModiaRedirect(
    pathname: string,
    search: { traadId?: string; dokument?: string; journalpost?: string },
    harAktivBruker: boolean
) {
    if (!harAktivBruker) {
        return { to: '/new' as const, search: {} };
    }

    switch (pathname.replace(/\/+$/, '')) {
        case '/person/meldinger':
            return { to: '/new/person/meldinger' as const, search: { traadId: search.traadId } };
        case '/person/oppfolging':
            return { to: '/new/person/oppfolging' as const, search: {} };
        case '/person/utbetaling':
            return { to: '/new/person/utbetaling' as const, search: {} };
        case '/person/ytelser':
            return { to: '/new/person/ytelser' as const, search: {} };
        case '/person/varsler':
            return { to: '/new/person/varsler' as const, search: {} };
        case '/person/saker':
        case '/saker':
            return { to: '/new/person/dokumenter' as const, search: {} };
        case '/dokument':
            if (search.dokument) {
                return {
                    to: '/new/dokument' as const,
                    search: { dokument: search.dokument, journalpost: search.journalpost }
                };
            }
    }
    return { to: '/new/person/hjem' as const, search: {} };
}
