import * as React from 'react';
import { useEffect } from 'react';
import { loggError } from './frontendLogger';
import { RefObject } from 'react';
import { useCallback } from 'react';

export function useFocusOnMount(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        try {
            if (ref.current) {
                ref.current.focus();
            }
            if (document.activeElement !== ref.current) {
                throw new Error('Kunne ikke sette fokus');
            }
        } catch (e) {
            loggError(e);
        }
    }, [ref.current]);
}

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: EventListener) {
    const handler: EventListener = useCallback(
        (event: Event) => {
            const wrapper: T | null = ref.current;
            if (wrapper != null && !wrapper.contains(event.target as Node)) {
                callback(event);
            }
        },
        [callback, ref.current]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [ref]);
}
