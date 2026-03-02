import type { Varsel } from 'src/lib/types/modiapersonoversikt-api';

export interface VarslerResult {
    feil: string[];
    varsler: Varsel[];
}
