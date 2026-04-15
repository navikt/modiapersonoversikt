import { useEffect, useLayoutEffect, useRef } from 'react';
import type { DecoratorPropsV3 } from './decoratorprops';
import { useDecoratorConfig } from './useDecoratorConfig';

function InternarbeidsflateDecoratorFullscreenElement(props: DecoratorPropsV3) {
    const ref = useRef<HTMLElement>(null);

    const onEnhetChangedRef = useRef(props.onEnhetChanged);
    onEnhetChangedRef.current = props.onEnhetChanged;
    const onFnrChangedRef = useRef(props.onFnrChanged);
    onFnrChangedRef.current = props.onFnrChanged;

    useEffect(() => {
        if (ref.current) {
            (ref.current as HTMLElement & { hotkeys: DecoratorPropsV3['hotkeys'] }).hotkeys = props.hotkeys;
        }
    }, [props.hotkeys]);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onEnhetChanged = (e: Event) => {
            const { enhet, enhetObjekt } = (e as CustomEvent).detail;
            onEnhetChangedRef.current(enhet, enhetObjekt);
        };
        const onFnrChanged = (e: Event) => {
            onFnrChangedRef.current((e as CustomEvent).detail.fnr);
        };

        el.addEventListener('enhet-changed', onEnhetChanged);
        el.addEventListener('fnr-changed', onFnrChanged);
        return () => {
            el.removeEventListener('enhet-changed', onEnhetChanged);
            el.removeEventListener('fnr-changed', onFnrChanged);
        };
    }, []);

    return (
        <internarbeidsflate-decorator-fullscreen
            ref={ref}
            app-name={props.appName}
            environment={props.environment}
            url-format={props.urlFormat}
            fnr={props.fnr}
            enhet={props.enhet}
            user-key={props.userKey}
            proxy={props.proxy}
            show-enheter={String(props.showEnheter)}
            show-search-area={String(props.showSearchArea)}
            show-hotkeys={String(props.showHotkeys)}
            enable-hotkeys={props.enableHotkeys !== undefined ? String(props.enableHotkeys) : undefined}
            fetch-active-enhet-on-mount={
                props.fetchActiveEnhetOnMount !== undefined ? String(props.fetchActiveEnhetOnMount) : undefined
            }
            fetch-active-user-on-mount={
                props.fetchActiveUserOnMount !== undefined ? String(props.fetchActiveUserOnMount) : undefined
            }
            markup={props.markup ? JSON.stringify(props.markup) : undefined}
        />
    );
}

export function LandingPage() {
    const { configV3 } = useDecoratorConfig();

    return <InternarbeidsflateDecoratorFullscreenElement {...configV3} />;
}
