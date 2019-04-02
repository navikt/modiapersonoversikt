import * as React from 'react';
import { useEffect } from 'react';
import { loggError } from './frontendLogger';

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
    }, []);
}
