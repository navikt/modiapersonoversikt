import { Skjulingsaarsak, type Tilgangsavslag } from 'src/lib/types/modiapersonoversikt-api';

export { Skjulingsaarsak };

export function hentSkjulingsaarsakTekst(aarsak: Skjulingsaarsak, avslag?: Tilgangsavslag | null): string {
    if (aarsak === Skjulingsaarsak.MANGLER_TILGANG) {
        const melding = avslag?.message?.trim();
        if (melding) {
            return `Personopplysninger er skjult: ${melding}`;
        }
    }

    switch (aarsak) {
        case Skjulingsaarsak.MANGLER_TILGANG:
            return 'Personopplysninger skjult';
        case Skjulingsaarsak.UAVKLART:
            return 'Personopplysninger kunne ikke hentes';
    }
}
