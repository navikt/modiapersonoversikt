import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { UseFieldStateReturn } from './formTypes';

function forceValidationOfAllFields<TFieldValues extends FieldValues>(form: UseFormReturn<TFieldValues>) {
    form.trigger();
}

export function useFieldState<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(name: TFieldName, form: UseFormReturn<TFieldValues>): UseFieldStateReturn<TFieldName> {
    const showError = form.formState.touchedFields[name] || form.formState.submitCount > 0;
    const error = form.formState.errors[name]?.message?.toString();
    const { ref, onChange, ...input } = form.register(name);

    return {
        input: {
            id: input.name,
            onChange: async (e) => {
                const res = await onChange(e);
                forceValidationOfAllFields(form);
                return res;
            },
            ...input
        },
        ref,
        error: showError ? error : undefined
    };
}
