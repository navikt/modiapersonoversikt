import { useCallback, DependencyList, useEffect } from 'react';

declare global {
    interface Element {
        scrollIntoViewIfNeeded?(opt_center: boolean): void;
    }
}

export default function useAlwaysInViewport(selector: string, deps: DependencyList = []) {
    const query = useCallback(() => document.querySelector(selector) as HTMLElement, [selector]);
    useEffect(() => {
        const element = query();
        if (element) {
            if (element.scrollIntoViewIfNeeded) {
                element.scrollIntoViewIfNeeded(true);
            } else {
                element.scrollIntoView({ block: 'start' });
            }
        }
    }, [...deps, query]);
}
