import { DependencyList, useCallback, useEffect } from 'react';

export default function useHotkey(key: string, action: () => void, deps: DependencyList) {
    const handler = useCallback(
        (event: KeyboardEvent) => {
            if (!event.altKey) {
                return;
            }

            const wantedKey = key.toLowerCase();
            const actualKey = (event.code ? event.code.replace('Key', '') : event.key).toLowerCase();

            if (wantedKey === actualKey) {
                event.preventDefault();
                event.stopPropagation();
                action();
            }
        },
        [key, ...deps]
    );

    useEffect(() => {
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [handler]);
}
