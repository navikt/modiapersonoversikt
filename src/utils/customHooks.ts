import * as React from 'react';
import { useEffect } from 'react';
import { loggError } from './frontendLogger';

export function useFocusOnMount(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        } else {
            loggError(new Error('Kunne ikke sette fokus på element'));
        }
    }, []);
}
