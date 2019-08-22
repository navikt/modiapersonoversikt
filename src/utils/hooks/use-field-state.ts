import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

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

    return {
        input: {
            value,
            onChange
        },
        setValue,
        isPristine: trim => (trim ? value.trim() === initialState.trim() : value === initialState)
    };
}
