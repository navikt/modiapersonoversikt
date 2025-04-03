import type { Oppfolging, Saksbehandler } from '../../../../models/oppfolging';

export function getErUnderOppfolging(oppfolging: Oppfolging | null): string {
    if (oppfolging == null) {
        return '\u2014';
    }
    return oppfolging.erUnderOppfolging ? 'Ja' : 'Nei';
}

export function getOppfolgingEnhet(oppfolging: Oppfolging | null): string {
    if (oppfolging == null) {
        return '\u2014';
    }
    return oppfolging.enhet ? `${oppfolging.enhet.enhetId} ${oppfolging.enhet.navn}` : 'Ikke angitt';
}

export function getVeileder(veileder: Saksbehandler | null | undefined): string {
    if (veileder === null || veileder === undefined || veileder.ident === '') {
        return '\u2014';
    }
    return `${veileder.navn} (${veileder.ident})`;
}
