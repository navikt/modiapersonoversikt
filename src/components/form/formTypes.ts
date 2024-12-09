import type { FieldValues, InternalFieldName } from 'react-hook-form';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { RefCallBack } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

export type UseFieldStateReturn<TFieldName extends InternalFieldName = InternalFieldName> = {
    input: Omit<UseFormRegisterReturn<TFieldName>, 'ref'> & { id: string };
    ref: RefCallBack;
    error?: string;
};

export interface FormElementProps<
    TFieldValues extends FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    name: TFieldName;
    form: UseFormReturn<TFieldValues>;
}
