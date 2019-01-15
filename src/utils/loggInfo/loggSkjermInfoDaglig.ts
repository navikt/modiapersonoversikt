import { loggEvent } from '../frontendLogger';
import { detect } from 'detect-browser';
import { roundToNearest50 } from '../math';
import { runOnceDaily } from '../runOnceDaily';
import { erKontaktsenter, getSaksbehandlerEnhet } from './saksbehandlersEnhetInfo';
import { getSaksbehandlerIdent } from './getSaksbehandlerIdent';

export function loggSkjermInfoDaglig() {
    runOnceDaily('Skjerminfo', loggInfo);
}

function loggInfo() {
    const screen: Screen = window.screen;
    const browser = detect();

    const tags = {
        screen: `${roundToNearest50(screen.width)} x ${roundToNearest50(screen.height)}`,
        window: `${roundToNearest50(window.innerWidth)} x ${roundToNearest50(window.innerHeight)}`,
        erKontaktsenter: erKontaktsenter(),
        browser: browser && browser.name || undefined
    };
    
    const fields = {
        enhet: getSaksbehandlerEnhet(),
        browserVersion: browser && browser.version || undefined,
        os: browser && browser.os || undefined,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        ident: getSaksbehandlerIdent()
    };

    loggEvent('LoggSkjerminfo', 'Maskinvare', tags, fields);
}
