import { type DependencyList, useCallback, useEffect, useMemo } from 'react';
import { loggEvent } from '../logger/frontendLogger';

type KeyDescription = {
    char: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
};
function toKeyDescription(value: string | KeyDescription): KeyDescription {
    if (typeof value === 'string') {
        return {
            char: value,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false
        };
    }
    return value;
}
function matches(keyDescription: KeyDescription, event: KeyboardEvent): boolean {
    const { altKey, ctrlKey, metaKey, shiftKey } = keyDescription;
    const wantedKey = keyDescription.char.toLowerCase();
    const actualKey = (event.code ? event.code.replace('Key', '') : event.key || '').toLowerCase();

    return [
        wantedKey === actualKey,
        Boolean(altKey) === event.altKey,
        Boolean(ctrlKey) === event.ctrlKey,
        Boolean(metaKey) === event.metaKey,
        Boolean(shiftKey) === event.shiftKey
    ].every((comp) => comp);
}

export default function useHotkey(
    key: string | KeyDescription,
    action: () => void,
    deps: DependencyList,
    loggAction: string,
    element: HTMLElement = document.body
) {
    // eslint-disable-next-line
    const stableAction = useMemo(() => action, deps);
    const keyDescription = useCallback(toKeyDescription, [key])(key);
    const handler = useCallback(
        (event: KeyboardEvent) => {
            if (matches(keyDescription, event)) {
                event.preventDefault();
                event.stopPropagation();
                loggEvent(loggAction, 'Hurtigtast', {
                    type: `Alt + ${keyDescription.char}`
                });
                stableAction();
            }
        },
        [keyDescription, stableAction, loggAction]
    );

    useEffect(() => {
        if (element) {
            element.addEventListener('keydown', handler);
            return () => element.removeEventListener('keydown', handler);
        }

        return undefined;
    }, [element, handler]);
}
