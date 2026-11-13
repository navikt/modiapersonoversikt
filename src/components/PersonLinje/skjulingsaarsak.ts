import {
    type Fullmektig,
    Skjulingsaarsak as SkjulingsaarsakKode,
    type Tilgangsavslag
} from 'src/lib/types/modiapersonoversikt-api';

export type Skjulingsaarsak = NonNullable<Fullmektig['skjulingsaarsak']>;

export function hentSkjulingsaarsakTekst(aarsak: Skjulingsaarsak, avslag?: Tilgangsavslag | null): string {
    if (aarsak === 'MANGLER_TILGANG') {
        const melding = avslag?.message?.trim();
        if (melding) {
            return `Personopplysninger er skjult: ${melding}`;
        }
    }

    switch (aarsak) {
        case SkjulingsaarsakKode.MANGLER_TILGANG:
            return 'Personopplysninger skjult';
        case SkjulingsaarsakKode.UAVKLART:
            return 'Personopplysninger kunne ikke hentes';
    }
}
