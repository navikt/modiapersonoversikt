import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

export interface FieldState {
    input: {
        value: string;
        onChange: any;
    };
    setValue: Dispatch<SetStateAction<string>>;

    isPristine(trim: boolean): boolean;
}

export default function useFieldState(initialState: string): FieldState {
    const [value, setValue] = useState(initialState);
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value), [
        setValue
    ]);
    const isPristine = useCallback(trim => (trim ? value.trim() === initialState.trim() : value === initialState), [
        value,
        initialState
    ]);

    return useMemo(
        () => ({
            input: {
                value,
                onChange
            },
            setValue,
            isPristine
        }),
        [value, onChange, setValue, isPristine]
    );
}
