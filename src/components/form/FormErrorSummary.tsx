import type { FeiloppsummeringProps } from 'nav-frontend-skjema';
import { Feiloppsummering, type FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { type RefObject, useEffect, useRef } from 'react';
import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';

function buildErrorFields<TFieldValues extends FieldValues>(errors: FieldErrors<TFieldValues>) {
    const res: FeiloppsummeringFeil[] = [];
    for (const [skjemaelementId, feil] of Object.entries(errors)) {
        if (feil) {
            res.push({ skjemaelementId, feilmelding: feil.message as string });
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

    // Typecast for legacy grunner. nav-frontend pakkene bruker gamel typer & vil fjernes
    // snart
    return <Feiloppsummering innerRef={ref as RefObject<HTMLDivElement>} feil={feil} {...errorSummaryProps} />;
}

export default FormErrorSummary;
