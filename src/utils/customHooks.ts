import * as React from 'react';
import { DependencyList, EffectCallback, RefObject, useCallback, useEffect, useRef } from 'react';
import { EventListener, runIfEventIsNotInsideRef } from './reactRef-utils';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

export function useFocusOnMount(ref: React.RefObject<HTMLElement>) {
    useOnMount(() => {
        if (ref.current) {
            ref.current.focus();
            if (document.activeElement !== ref.current) {
                console.error('Kunne ikke sette fokus på: ' + ref.current.innerText);
            }
        }
    });
}

export function useOnMount(effect: EffectCallback) {
    useEffect(effect, []);
}

export type JustOnceEffectCallback = (done: () => void) => void | (() => void | undefined);
export function useJustOnceEffect(effect: JustOnceEffectCallback, deps?: DependencyList) {
    const done = useRef(false);
    const setDone = useCallback(() => {
        done.current = true;
    }, [done]);
    useEffect(() => {
        if (!done.current) {
            return effect(setDone);
        }
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useOnUpdate(effect: EffectCallback, deps: DependencyList) {
    const firstMount = useRef(true);

    useEffect(() => {
        if (firstMount.current) {
            firstMount.current = false;
        } else {
            return effect();
        }
    }, [deps, effect]);
}

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T>, callback: EventListener) {
    const handler: EventListener = useCallback(runIfEventIsNotInsideRef(ref, callback), [ref, callback]);

    useEffect(() => {
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
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

export function useFødselsnummer() {
    return useAppState(state => state.gjeldendeBruker.fødselsnummer);
}
