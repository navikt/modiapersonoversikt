import { removeWhitespace } from '../../utils/string-utils';

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

function erIkkeTomStreng(input: string) {
    if (removeWhitespace(input).length === 0) {
        return 'Kan ikke være tom';
    }
    return null;
}

export const validatorer = {
    erIkkeTomStreng
};

export const stringTilSkjemainput = (value: string | undefined) => ({value: value ? value : '', skjemafeil: []});
export const defaultSkjemainput = {value: '', skjemafeil: []};