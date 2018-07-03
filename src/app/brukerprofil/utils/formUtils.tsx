import * as React from 'react';

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

const ENTER_KEY_PRESS = 13;

export function ignoreEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === ENTER_KEY_PRESS) {
        event.preventDefault();
    }
}
