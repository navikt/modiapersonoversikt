import React, { DependencyList, useEffect } from 'react';

declare global {
    interface Element {
        scrollIntoViewIfNeeded?(opt_center: boolean): void;
    }
}

export default function useAlwaysInViewport(selector: string, deps: DependencyList = []) {
    const query = React.useCallback(() => document.querySelector(selector), [selector]);
    useEffect(() => {
        const element = query();
        if (element) {
            if (element.scrollIntoViewIfNeeded) {
                element.scrollIntoViewIfNeeded(true);
            } else {
                element.scrollIntoView({ block: 'start' });
            }
        }
    }, [...deps, query]); // eslint-disable-line
}
