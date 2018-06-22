import * as React from 'react';
import { ChangeEvent } from 'react';

import Input, { NavFrontendInputProps } from 'nav-frontend-skjema/lib/input';

interface Props extends NavFrontendInputProps {
    skjemainput: Skjemainput;
    onSkjemainput: (skjemainput: Skjemainput) => void;
    validatorer?: ((input: string) => string | null)[];
}

export interface Skjemainput {
    value: string;
    skjemafeil: string[];
}

function onChange(value: string, props: Props) {
    if (!props.validatorer) {
        props.onSkjemainput({value, skjemafeil: []});
        return;
    }

    let skjemafeil = [];
    for (let i = 0; i < props.validatorer.length; i++) {
        let validationResult = props.validatorer[i](value);
        if (validationResult) {
            skjemafeil.push(validationResult);
        }
    }

    props.onSkjemainput({value, skjemafeil});
}

function lagFeilmelding(skjemafeil: string[]) {
    return {feilmelding: skjemafeil.join(', ')};
}

export function Skjemainput(props: Props) {
    const {skjemainput, onSkjemainput, validatorer, ...rest} = props;

    const feilmelding = skjemainput.skjemafeil.length > 0 ? lagFeilmelding(skjemainput.skjemafeil) : undefined;

    return (
        <Input
            {...rest}
            defaultValue={props.skjemainput.value}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange(event.target.value, props)
            }
            feil={feilmelding}
        />
    );
}