import { useCallback, useState } from 'react';

export default function useToggle(initialValue: boolean = false): [boolean, () => void] {
    const [value, setValue] = useState<boolean>(initialValue);
    const toggle = useCallback(() => {
        setValue((old) => !old);
    }, [setValue]);
    return [value, toggle];
}
