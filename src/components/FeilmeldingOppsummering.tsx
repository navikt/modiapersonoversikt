import React, { useEffect, useRef } from 'react';
import { Formstate } from '@nutgaard/use-formstate';
import { Feiloppsummering } from 'nav-frontend-skjema';

interface Props {
    formstate: Formstate<any>;
    tittel: string;
}

export function FeilmeldingOppsummering(props: Props) {
    const errors = Object.values(props.formstate.fields).filter((field) => field.touched);
    const summaryRef = useRef<HTMLDivElement>(null);

    const submittoken = props.formstate.submittoken;
    // focus on summary ref when shown
    useEffect(() => {
        if (submittoken && summaryRef.current !== null) {
            summaryRef.current.focus();
            summaryRef.current.scrollIntoView && summaryRef.current.scrollIntoView();
        }
    }, [submittoken, summaryRef]);

    if (!props.formstate.submittoken || errors.length === 0) {
        return null;
    }

    const feilmeldinger = errors
        .filter((field) => field.error)
        .map((field) => ({
            skjemaelementId: field.input.id,
            feilmelding: field.error!!
        }));

    return <Feiloppsummering innerRef={summaryRef} tittel={props.tittel} feil={feilmeldinger} />;
}
