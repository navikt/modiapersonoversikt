import { FeltValidering } from './adresse/FormValidator';

export interface InputState {
    input: string;
    feilmelding: string | null;
}

export function getSkjemafeil(state: InputState) {
    if (state.feilmelding) {
        return {
            feilmelding: state.feilmelding
        };
    } else {
        return undefined;
    }
}

export function getSkjemafeilFraValidering(validering?: FeltValidering) {
    if (!validering) {
        return undefined;
    }

    if (!validering.erGyldig) {
        return {
            feilmelding: validering.feilmelding
        };
    } else {
        return undefined;
    }
}
