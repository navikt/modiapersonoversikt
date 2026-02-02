import type { OppfolgingDto, Veileder } from 'src/generated/modiapersonoversikt-api';

export function getOppfolgingEnhet(oppfolging?: OppfolgingDto): string {
    return oppfolging
        ? oppfolging.enhet
            ? `${oppfolging.enhet.enhetId} ${oppfolging.enhet.navn}`
            : 'Ikke angitt'
        : '-';
}

export function getVeileder(veileder?: Veileder): string {
    return veileder ? `${veileder.navn} (${veileder.ident})` : '-';
}

export function getMeldeplikt(meldeplikt?: boolean): string {
    return meldeplikt ? 'Ja' : meldeplikt === false ? 'Nei' : 'Meldeplikt Ukjent';
}
