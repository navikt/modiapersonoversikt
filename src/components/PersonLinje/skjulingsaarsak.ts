import type { Fullmektig } from 'src/lib/types/modiapersonoversikt-api';

export type Skjulingsaarsak = NonNullable<Fullmektig['skjulingsaarsak']>;

export function hentSkjulingsaarsakTekst(aarsak: Skjulingsaarsak): string {
    switch (aarsak) {
        case 'MANGLER_TILGANG':
            return 'Personopplysninger skjult';
        case 'UAVKLART':
            return 'Personopplysninger kunne ikke hentes';
    }
}
