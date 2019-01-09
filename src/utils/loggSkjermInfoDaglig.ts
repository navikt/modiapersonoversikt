import { loggEvent } from './frontendLogger';
import { detect } from 'detect-browser';
import * as Cookies from 'js-cookie';
import { roundToNearest20 } from './math';
import { runOnceDaily } from './runOnceDaily';

export function loggSkjermInfoDaglig() {
    runOnceDaily('Skjerminfo', loggInfo);
}

function loggInfo() {
    const screen: Screen = window.screen;
    const browser = detect();

    const tags = {
        screen: `${roundToNearest20(screen.width)} x ${roundToNearest20(screen.height)}`,
        window: `${roundToNearest20(window.innerWidth)} x ${roundToNearest20(window.innerHeight)}`,
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
        windowHeight: window.innerHeight
    };

    loggEvent('LoggSkjerminfo', 'Maskinvare', tags, fields);
}

interface Cookie {
    [name: string]: string;
}

function erKontaktsenter(): boolean | undefined {
    const enhet = getSaksbehandlerEnhet();
    if (enhet) {
        if (enhet.slice(0, 2) === '41') {
            return true;
        } else {
            return false;
        }
    }
    return undefined;
}

function getSaksbehandlerEnhet(): string | undefined {
    const allCookies: Cookie = Cookies.get();
    const cookienavn = Object.keys(allCookies).find(key => key.includes('saksbehandlerinnstillinger'));
    if (cookienavn) {
        return allCookies[cookienavn];
    }
    return undefined;
}
