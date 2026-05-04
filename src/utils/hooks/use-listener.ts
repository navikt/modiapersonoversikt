import { useCallback, useEffect } from 'react';

export default function useListener(selector: string, event: string, fn: EventListener, parent?: Element | null) {
    const handler: EventListener = useCallback(
        (event) => {
            // Bruk composedPath så klikk inne i shadow-dom root også blir matchet
            const hit = event.composedPath().some((el) => el instanceof Element && el.matches(selector));
            if (hit) {
                fn(event);
            }
        },
        [selector, fn]
    );

    useEffect(() => {
        const parentSafe: Element = parent || document.body;
        parentSafe.addEventListener(event, handler);
        return () => parentSafe.removeEventListener(event, handler);
    }, [selector, event, handler, parent]);
}
