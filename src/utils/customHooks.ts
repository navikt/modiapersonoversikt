import { useNavigate } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { eq } from 'lodash';
import type * as React from 'react';
import {
    type DependencyList,
    type EffectCallback,
    type RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { useSelector } from 'react-redux';
import { nyModiaAtom } from 'src/components/NyModia';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { paths } from '../app/routes/routing';
import type { AppState } from '../redux/reducers';
import { type EventListener, runIfEventIsNotInsideRef } from './reactRef-utils';

export function useFocusOnMount(ref: React.RefObject<HTMLElement | null>) {
    useOnMount(() => {
        if (ref.current) {
            ref.current.focus();
            if (document.activeElement !== ref.current) {
                console.error(`Kunne ikke sette fokus på: ${ref.current.innerText}`);
            }
        }
    });
}

export function useOnMount(effect: EffectCallback) {
    useEffect(effect, []);
}

type JustOnceEffectCallback = ((done: () => void) => undefined) | (() => undefined | undefined);

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

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, callback: EventListener) {
    const handler: EventListener = useMemo(() => runIfEventIsNotInsideRef(ref, callback), [ref, callback]);

    useEffect(() => {
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [handler]);
}

export function usePrevious<T>(value: T) {
    const [current, setCurrent] = useState<T>(value);
    const [previous, setPrevious] = useState<T | null>(null);

    if (!eq(previous, value)) {
        setPrevious(current);
        setCurrent(value);
    }

    return previous;
}

export function useAppState<T>(selector: (state: AppState) => T) {
    return useSelector((state: AppState) => selector(state));
}

export function useSettAktivBruker() {
    const setBruker = useSetAtom(aktivBrukerAtom);
    const nyModia = useAtomValue(nyModiaAtom);
    const navigate = useNavigate();

    return (fnr: string | null, redirect = true) => {
        if (!fnr) {
            navigate({ to: '/' });
            setBruker('');
            return;
        }

        setBruker(fnr);
        if (
            redirect &&
            ![
                '/new/person',
                paths.personUri,
                paths.sakerFullscreen,
                paths.saksdokumentEgetVindu,
                paths.standaloneKomponenter,
                paths.landingPage
            ].some((path) => location.pathname.startsWith(path))
        ) {
            navigate({ to: nyModia ? '/new/person' : paths.personUri });
        }
    };
}

export function useAntallListeElementeBasertPaaSkjermStorrelse() {
    const [antallListeElementer, setAntallListeElementer] = useState(
        window.matchMedia('(max-width: 767px)').matches ? 5 : 10
    );

    useEffect(() => {
        const handler = () => {
            setAntallListeElementer(window.matchMedia('(max-width: 767px)').matches ? 5 : 10);
        };
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return antallListeElementer;
}
