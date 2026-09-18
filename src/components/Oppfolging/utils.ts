import type { OppfolgingDto, Veileder } from 'src/generated/modiapersonoversikt-api';

export function getOppfolgingEnhet(oppfolging?: OppfolgingDto | null): string {
    return oppfolging
        ? oppfolging.enhet
            ? `${oppfolging.enhet.enhetId} ${oppfolging.enhet.navn}`
            : 'Ikke angitt'
        : '-';
}

export function getVeileder(veileder?: Veileder | null): string {
    return veileder ? `${veileder.navn} (${veileder.ident})` : '-';
}
