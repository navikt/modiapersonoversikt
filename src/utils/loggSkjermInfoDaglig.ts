import { loggEvent } from './frontendLogger';
import * as moment from 'moment';
import { detect } from 'detect-browser';
import * as Cookies from 'js-cookie';

const cookieNavn = 'logResolution';

export function loggSkjermInfoDaglig() {
    if (checkIfLoggedToday()) {
        return;
    }
    loggInfo();
    setLoggedTodayCookie();
}

function checkIfLoggedToday() {
    const cookie = Cookies.get(cookieNavn);
    if (cookie) {
        return true;
    }
    return false;
}

function setLoggedTodayCookie() {
    const tomorrow = moment().add(1, 'day').hour(10).startOf('hour').toDate();
    Cookies.set(
        cookieNavn,
        'Screen resolution was reported ' + new Date().toDateString(),
        {
            expires: tomorrow
        });
}

function loggInfo() {
    const screen: Screen = window.screen;
    const browser = detect();

    const tags = {
        screen: `${screen.width} x ${screen.height}`,
        window: `${window.innerWidth} x ${window.innerHeight}`,
        screenWidth: screen.width,
        screenHeight: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        erKontaktsenter: erKontaktsenter(),
        enhet: getSaksbehandlerEnhet(),
        browser: browser && browser.name || undefined,
        browserVersion: browser && browser.version || undefined,
        os: browser && browser.os || undefined
    };

    loggEvent('LoggSkjerminfo', 'Maskinvare', tags);
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
