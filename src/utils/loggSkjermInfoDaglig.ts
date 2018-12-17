import { loggEvent } from './frontendLogger';
import Cookies from 'universal-cookie';
import * as moment from 'moment';

const cookies = new Cookies({});
const cookieNavn = 'loggScreenResolutionCookie';

export function loggSkjermInfoDaglig() {
    if (checkIfLoggedToday()) {
        return;
    }
    loggInfo();
    setLoggedTodayCookie();
}

function checkIfLoggedToday() {
    const cookie = cookies.get(cookieNavn);
    if (cookie) {
        return true;
    }
    return false;
}

function setLoggedTodayCookie() {
    const tomorrow = moment().add(1, 'day').hour(10).startOf('hour').toDate();
    cookies.set(
        cookieNavn,
        'Screen resolution was logged today',
        {
            expires: tomorrow
        });
}

function loggInfo() {
    const screen: Screen = window.screen;

    const resolutionScreen = `${screen.width} x ${screen.height}`;
    const resolutionWindow = `${window.innerWidth} x ${window.innerHeight}`;
    const tags = {
        skjerm: resolutionScreen,
        vindu: resolutionWindow,
        erKontaktsenter: erKontaktsenter(),
        enhet: getSaksbehandlerEnhet()
    };

    loggEvent('LoggOppløsning', 'Maskinvare', tags);
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
    const allCookies: Cookie = cookies.getAll();
    const cookienavn = Object.keys(allCookies).find(key => key.includes('saksbehandlerinnstillinger'));
    if (cookienavn) {
        return allCookies[cookienavn];
    }
    return undefined;
}
