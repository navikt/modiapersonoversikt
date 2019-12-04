import { loggEvent } from '../frontendLogger';
import { detect } from 'detect-browser';
import { roundToNearest100 } from '../math';
import { runOnceDaily } from '../runOnceDaily';
import { useAppState, useOnMount } from '../customHooks';
import { erKontaktsenter } from '../enheterUtils';

export function useLoggSkjermInfoDaglig() {
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    useOnMount(() => {
        runOnceDaily('Skjerminfo', () => loggInfo(valgtEnhet || ''));
    });
}

function loggInfo(enhet: string) {
    const screen: Screen = window.screen;
    const browser = detect();

    const tags = {
        screen: `${roundToNearest100(screen.width)} x ${roundToNearest100(screen.height)}`,
        window: `${roundToNearest100(window.innerWidth)} x ${roundToNearest100(window.innerHeight)}`,
        erKontaktsenter: erKontaktsenter(enhet),
        browser: (browser && browser.name) || undefined
    };

    const fields = {
        enhet: enhet,
        browserVersion: (browser && browser.version) || undefined,
        os: (browser && browser.os) || undefined,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    };

    loggEvent('LoggSkjerminfo', 'Maskinvare', tags, fields);
}
