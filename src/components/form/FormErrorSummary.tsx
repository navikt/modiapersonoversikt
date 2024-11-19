import { FieldValues } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { FieldErrors } from 'react-hook-form';
import { FeiloppsummeringProps } from 'nav-frontend-skjema';

function buildErrorFields<TFieldValues extends FieldValues>(errors: FieldErrors<TFieldValues>) {
    const res: FeiloppsummeringFeil[] = [];
    for (const [skjemaelementId, feil] of Object.entries(errors)) {
        if (feil) {
            res.push({ skjemaelementId, feilmelding: feil.message });
        }
    }

    return res;
}

interface Props<TFieldValues extends FieldValues> extends Omit<FeiloppsummeringProps, 'feil' | 'customFeilRender'> {
    // TODO: Set this to required
    form?: UseFormReturn<TFieldValues>;
}

function FormErrorSummary<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
    const ref = useRef<HTMLDivElement>(null);
    const { form, ...errorSummaryProps } = props;

    const submitCount = form?.formState.submitCount ?? 0;
    const feil = buildErrorFields(form?.formState.errors ?? ([] as FieldErrors<TFieldValues>));

    const skalViseFeilmelding = submitCount > 0 && feil.length > 0;

    useEffect(() => {
        if (ref.current) {
            ref.current?.focus();
            ref.current?.scrollIntoView();
        }
    }, [submitCount, ref]);

    if (!skalViseFeilmelding) {
        return null;
    }

    return <Feiloppsummering innerRef={ref} feil={feil} {...errorSummaryProps} />;
}

export default FormErrorSummary;
