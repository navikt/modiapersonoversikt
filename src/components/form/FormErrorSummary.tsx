import { FieldValues } from 'react-hook-form/dist/types/fields';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { useEffect, useRef } from 'react';
import { Feiloppsummering } from 'nav-frontend-skjema';
import * as React from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { FeiloppsummeringProps } from 'nav-frontend-skjema';

function useErrorFields<TFieldValues extends FieldValues>(errors: FieldErrors<TFieldValues>) {
    return Object.entries(errors).map(([skjemaelementId, feil]) => ({
        skjemaelementId,
        feilmelding: feil.message
    }));
}

interface Props<TFieldValues extends FieldValues> extends FeiloppsummeringProps {
    form: UseFormReturn<TFieldValues>;
}

function FormErrorSummary<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
    const ref = useRef<HTMLDivElement>(null);
    const { form, ...errorSummaryProps } = props;

    const submitCount = form.formState.submitCount;
    const feil = useErrorFields(form.formState.errors);

    const skalViseFeilmelding = submitCount !== 0 || feil.length !== 0;

    useEffect(() => {
        if (skalViseFeilmelding && ref.current) {
            ref.current?.focus();
            ref.current?.scrollIntoView();
        }
    }, [submitCount, skalViseFeilmelding, ref]);

    if (!skalViseFeilmelding) {
        return null;
    }

    return <Feiloppsummering innerRef={ref} {...errorSummaryProps} feil={feil} />;
}

export default FormErrorSummary;
