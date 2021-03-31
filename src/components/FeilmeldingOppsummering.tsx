import React from 'react';
import { FieldState, Formstate } from '@nutgaard/use-formstate';
import { Feiloppsummering } from 'nav-frontend-skjema';

interface Props {
    formstate: Formstate<any>;
    tittel: string;
}

export function FeilmeldingOppsummering(props: Props) {
    if (!props.formstate.submittoken || Object.values(props.formstate.errors).length === 0) {
        return null;
    }

    const feilmeldinger = Object.values(props.formstate.fields)
        .filter((field: FieldState) => field.touched)
        .map((field: FieldState) => ({ skjemaelementId: field.input.id, feilmelding: field.error ?? '' }));

    return <Feiloppsummering tittel={props.tittel} feil={feilmeldinger} />;
}
