import * as React from 'react';
import { DependencyList, EffectCallback, RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { EventListener, runIfEventIsNotInsideRef } from './reactRef-utils';
import { useDispatch, useSelector } from 'react-redux';
import setGjeldendeBrukerIRedux from '../redux/gjeldendeBruker/actions';
import { AppState } from '../redux/reducers';
import { useLocation } from 'react-router';
import { paths } from '../app/routes/routing';
import { push } from 'connected-react-router';

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

type JustOnceEffectCallback = (done: () => void) => void | (() => void | undefined);
export function useJustOnceEffect(effect: JustOnceEffectCallback, deps?: DependencyList) {
    const done = useRef(false);
    const setDone = useCallback(() => {
        done.current = true;
    }, [done]);
    useEffect(() => {
        if (!done.current) {
            return effect(setDone);
        }
    }, deps);
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
    const handler: EventListener = useMemo(() => runIfEventIsNotInsideRef(ref, callback), [ref, callback]);

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

export function useFodselsnummer() {
    return useAppState((state) => state.gjeldendeBruker.fødselsnummer);
}

export function useSettAktivBruker() {
    const dispatch = useDispatch();
    const location = useLocation();

    return (fnr: string | null) => {
        if (!fnr) {
            dispatch(push(paths.basePath));
            dispatch(setGjeldendeBrukerIRedux(''));
            return;
        }

        dispatch(setGjeldendeBrukerIRedux(fnr ?? ''));
        if (
            ![
                paths.personUri,
                paths.sakerFullscreen,
                paths.saksdokumentEgetVindu,
                paths.standaloneKomponenter,
                paths.landingPage,
                paths.innkrevingskrav
            ].some((path) => location.pathname.startsWith(path))
        ) {
            dispatch(push(paths.personUri));
        }
    };
}
