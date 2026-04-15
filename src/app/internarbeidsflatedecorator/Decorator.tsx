import { useEffect, useLayoutEffect, useRef } from 'react';
import { NyModiaPortal } from 'src/app/internarbeidsflatedecorator/NyModiaPortal';
import { OppstartNyModiaDialog } from 'src/components/NyModia/OppstartNyModiaDialog';
import useOpenIntroduksjonsModal from 'src/components/NyModia/useHarSettNyModiaDialog';
import Personsok from 'src/components/personsok';
import OppdateringsloggContainer from '../oppdateringslogg/OppdateringsloggContainer';
import type { DecoratorPropsV3 } from './decoratorprops';
import DecoratorEasterEgg from './EasterEggs/DecoratorEasterEgg';
import { useDecoratorConfig } from './useDecoratorConfig';

function InternarbeidsflateDecoratorElement(props: DecoratorPropsV3) {
    const ref = useRef<HTMLElement>(null);

    // Hold siste versjon av callbacks i refs så event-handlers aldri blir utdaterte og aldri trenger å re-registreres
    const onEnhetChangedRef = useRef(props.onEnhetChanged);
    onEnhetChangedRef.current = props.onEnhetChanged;
    const onFnrChangedRef = useRef(props.onFnrChanged);
    onFnrChangedRef.current = props.onFnrChanged;
    const onLinkClickRef = useRef(props.onLinkClick);
    onLinkClickRef.current = props.onLinkClick;

    // Hotkeys kan inneholde funksjoner som ikke kan JSON-serialiseres — settes direkte som JS-property
    useEffect(() => {
        if (ref.current) {
            (ref.current as HTMLElement & { hotkeys: DecoratorPropsV3['hotkeys'] }).hotkeys = props.hotkeys;
        }
    }, [props.hotkeys]);

    // useLayoutEffect kjører sync etter DOM-commit (som er før noe vises på skjermen), slik at lyttere er
    // registrert før web componentens interne React-scheduler kan sende context-events.
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
        const onLinkClick = (e: Event) => {
            onLinkClickRef.current?.((e as CustomEvent).detail);
        };

        el.addEventListener('enhet-changed', onEnhetChanged);
        el.addEventListener('fnr-changed', onFnrChanged);
        el.addEventListener('link-click', onLinkClick);
        return () => {
            el.removeEventListener('enhet-changed', onEnhetChanged);
            el.removeEventListener('fnr-changed', onFnrChanged);
            el.removeEventListener('link-click', onLinkClick);
        };
    }, []); // tom deps-array — stabile handlers via refs, registreres én gang ved mount

    return (
        <internarbeidsflate-decorator
            ref={ref}
            app-name={props.appName}
            environment={props.environment}
            url-format={props.urlFormat}
            fnr={props.fnr}
            enhet={props.enhet}
            user-key={props.userKey}
            proxy={props.proxy}
            websocket-url={props.websocketUrl}
            access-token={props.accessToken}
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

function Decorator() {
    const { configV3 } = useDecoratorConfig();
    const [open] = useOpenIntroduksjonsModal();

    return (
        <nav>
            <InternarbeidsflateDecoratorElement {...configV3} />
            <Personsok />
            <OppdateringsloggContainer />
            <NyModiaPortal />
            {open && <OppstartNyModiaDialog />}
            <DecoratorEasterEgg />
        </nav>
    );
}

export default Decorator;
