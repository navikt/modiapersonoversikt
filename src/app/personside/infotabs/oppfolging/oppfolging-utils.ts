import type { OppfolgingDto, Veileder } from 'src/generated/modiapersonoversikt-api';

export function getErUnderOppfolging(oppfolging: OppfolgingDto | null | undefined): string {
    if (oppfolging == null) {
        return '\u2014';
    }
    return oppfolging.erUnderOppfolging ? 'Ja' : 'Nei';
}

export function getOppfolgingEnhet(oppfolging?: OppfolgingDto | null | undefined): string {
    if (oppfolging == null) {
        return '\u2014';
    }
    return oppfolging.enhet ? `${oppfolging.enhet.enhetId} ${oppfolging.enhet.navn}` : 'Ikke angitt';
}

export function getVeileder(veileder: Veileder | null | undefined): string {
    if (veileder === null || veileder === undefined || veileder.ident === '') {
        return '\u2014';
    }
    return `${veileder.navn} (${veileder.ident})`;
}
