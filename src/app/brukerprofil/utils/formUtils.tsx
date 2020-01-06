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
