import { FieldValues } from 'react-hook-form/dist/types/fields';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { UseFieldStateReturn } from './formTypes';

export function useFieldState<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(name: TFieldName, formstate: UseFormReturn<TFieldValues>): UseFieldStateReturn<TFieldName> {
    const showError = formstate.formState.touchedFields[name] || formstate.formState.submitCount > 0;
    const error = formstate.formState.errors[name]?.message?.toString();
    const { ref, ...input } = formstate.register(name);

    return {
        input: {
            id: input.name,
            ...input
        },
        ref,
        error: showError ? error : undefined
    };
}
