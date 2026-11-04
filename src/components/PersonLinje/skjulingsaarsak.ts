import type { Fullmektig, Tilgangsavslag } from 'src/lib/types/modiapersonoversikt-api';

export type Skjulingsaarsak = NonNullable<Fullmektig['skjulingsaarsak']>;

export function hentSkjulingsaarsakTekst(aarsak: Skjulingsaarsak, avslag?: Tilgangsavslag | null): string {
    if (aarsak === 'MANGLER_TILGANG') {
        const detaljer = [avslag?.title?.trim(), avslag?.message?.trim()].filter(Boolean).join(': ');
        if (detaljer) {
            return `Tilgangskontroll: ${detaljer}`;
        }
    }

    switch (aarsak) {
        case 'MANGLER_TILGANG':
            return 'Personopplysninger skjult';
        case 'UAVKLART':
            return 'Personopplysninger kunne ikke hentes';
    }
}
