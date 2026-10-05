import type { KodeBeskrivelseString } from 'src/lib/types/modiapersonoversikt-api';

export function formaterRettighetstemaer(rettigheter: KodeBeskrivelseString[]): string {
    return rettigheter
        .map((rettighet) => rettighet.beskrivelse)
        .join(', ')
        .toLowerCase();
}
