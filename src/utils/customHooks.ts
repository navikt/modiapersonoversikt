import * as React from 'react';
import { EffectCallback, RefObject, useCallback, useEffect, useRef } from 'react';
import { EventListener, runIfEventIsNotInsideRef } from './reactRefUtils';
import { AppState } from '../redux/reducers';
import { useSelector } from 'react-redux';
import { RestEndepunkter } from '../redux/restReducers/restReducers';

export function useFocusOnMount(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
            if (document.activeElement !== ref.current) {
                console.error('Kunne ikke sette fokus på: ' + ref.current.innerText);
            }
        }
    }, [ref]);
}

export function useOnMount(effect: EffectCallback) {
    useEffect(effect, []);
}

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: EventListener) {
    const handler: EventListener = useCallback(runIfEventIsNotInsideRef(ref, callback), [ref, callback]);

    useEffect(() => {
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [handler]);
}

export function useFocusOutside<T extends HTMLElement>(ref: RefObject<T>, callback: EventListener) {
    const handler: EventListener = useCallback(runIfEventIsNotInsideRef(ref, callback), [ref, callback]);

    useEffect(() => {
        document.addEventListener('focusin', handler);
        return () => document.removeEventListener('focusin', handler);
    }, [handler]);
}

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function useAppState<T>(selector: (state: AppState) => T) {
    return useSelector((state: AppState) => selector(state));
}

export function useRestResource<T>(selector: (resources: RestEndepunkter) => T) {
    return useAppState(state => selector(state.restResources));
}

export function useFødselsnummer() {
    return useAppState(state => state.gjeldendeBruker.fødselsnummer);
}
