import type * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

type Alternatives = {
    [mediaQuery: string]: () => React.ReactElement;
};

interface Props {
    alternatives: Alternatives;
}

function useMatchMediaListeners(mediaQueries: Array<string>): Array<boolean> {
    const listeners = useMemo(() => mediaQueries.map((it) => window.matchMedia(it)), [mediaQueries]);
    const [state, setState] = useState(listeners.map((it) => it.matches));

    useEffect(() => {
        const changeHandlers = listeners.map((_, i) => (e: MediaQueryListEvent) => {
            setState((prevState) => {
                const copy = [...prevState];
                copy[i] = e.matches;
                return copy;
            });
        });

        // biome-ignore lint/suspicious/useIterableCallbackReturn: Biome migration
        listeners.forEach((it, i) => it.addEventListener('change', changeHandlers[i]));

        // biome-ignore lint/suspicious/useIterableCallbackReturn: Biome migration
        return () => listeners.forEach((it, i) => it.removeEventListener('change', changeHandlers[i]));
    }, [listeners]);

    return state;
}

function MediaQueryAwareRenderer(props: Props) {
    const matchingMediaQueries = useMatchMediaListeners(Object.keys(props.alternatives));
    const indexOfFirstMatching = matchingMediaQueries.findIndex((it) => it);

    if (indexOfFirstMatching === -1) {
        return null;
    }
    return Object.values(props.alternatives)[indexOfFirstMatching]();
}

export default MediaQueryAwareRenderer;
