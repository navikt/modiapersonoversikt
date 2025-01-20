import { useEffect, useLayoutEffect, useRef } from 'react';

/*
 * Source: https://github.com/uidotdev/usehooks
 *
 * Licenced MIT.
 * Author: ui.dev (2023)
 *
 */

export function useClickAway<T extends Element>(cb: (e: Event) => void) {
    const ref = useRef<T | null>(null);
    const refCb = useRef(cb);

    useLayoutEffect(() => {
        refCb.current = cb;
    });

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            const element = ref.current;
            if (element && e.target && !element.contains(e.target as Node)) {
                refCb.current(e);
            }
        };

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    }, []);

    return ref;
}
