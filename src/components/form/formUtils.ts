import type { FieldError, FieldValues, Path, SetValueConfig, UseFormReturn } from 'react-hook-form';

export function buildFieldError(errorMessage: string): FieldError {
    return { message: errorMessage, type: 'validate' };
}

/**
 * React Hook Form har ikke bra støtte for Generics og reusable components. Disse typeguardene er laget som en midlertidig workaround inntil
 * v.8 blir sluppet. Mer info:
 * https://github.com/react-hook-form/react-hook-form/discussions/7354
 *
 * Work around inspo:
 * https://stackoverflow.com/questions/72126944/how-to-create-a-reusable-react-hook-form-component-with-typescript-generics
 */

export function watchGuard<TFieldValues extends FieldValues, TFieldName extends keyof TFieldValues>(
    form: UseFormReturn<TFieldValues>,
    fieldName: TFieldName
) {
    return form.watch(fieldName as unknown as Path<TFieldValues>);
}

export function setValueGuard<TFieldValues extends FieldValues, TFieldName extends keyof TFieldValues>(
    form: UseFormReturn<TFieldValues>,
    fieldName: TFieldName,
    value: TFieldValues[TFieldName],
    options?: SetValueConfig
) {
    return form.setValue(fieldName as unknown as Path<TFieldValues>, value, options);
}
