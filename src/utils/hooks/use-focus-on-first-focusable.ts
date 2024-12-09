import type { MutableRefObject } from 'react';
import { useJustOnceEffect } from '../customHooks';

export function focusOnFirstFocusable(element: HTMLElement | null) {
    const focusable = element?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable) {
        focusable.focus();
        return true;
    }
    return false;
}

export function useFocusOnFirstFocusable(container: MutableRefObject<HTMLElement | null>) {
    const element = container.current;
    useJustOnceEffect(
        (done) => {
            const focused = focusOnFirstFocusable(container.current);
            if (focused) {
                done();
            }
        },
        [element]
    );
}
