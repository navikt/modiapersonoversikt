import { useCallback, useEffect } from 'react';

export default function useListener(selector: string, event: string, fn: EventListener, parent?: Element | null) {
    const handler: EventListener = useCallback(
        event => {
            const target = event.target;
            if (target instanceof Element && target?.matches(selector)) {
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
