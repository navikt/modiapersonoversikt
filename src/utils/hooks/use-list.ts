import { useCallback, useMemo, useState } from 'react';

interface HookType<TYPE> {
    values: TYPE[];
    add(value: TYPE): void;
    remove(value: TYPE): void;
    clear(): void;
}

export default function useList<TYPE>(initialValues: TYPE[] = []): HookType<TYPE> {
    const [values, setValues] = useState<TYPE[]>(initialValues);
    const add = useCallback(
        (value: TYPE) =>
            setValues((current) => {
                return [...current, value];
            }),
        [setValues]
    );

    const remove = useCallback(
        (value: TYPE) =>
            setValues((current) => {
                return current.filter((v) => v !== value);
            }),
        [setValues]
    );

    const clear = useCallback(() => setValues([]), [setValues]);

    return useMemo(() => ({ values, add, remove, clear }), [values, add, remove, clear]);
}
