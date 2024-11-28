import { FieldPath, FieldValues } from 'react-hook-form';

export const feilmeldingReactHookForm = <
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
    { formState }: FieldValues,
    formKey: TFieldName
) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { touchedFields, isSubmitted, errors } = formState;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const touched = touchedFields[formKey];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const error = errors[formKey];

    if ((touched || isSubmitted) && error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return <>{error.message}</>;
    }
    return undefined;
};
