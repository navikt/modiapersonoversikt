import * as Cookies from 'js-cookie';
import { loggError } from '../frontendLogger';

interface Cookie {
    [name: string]: string;
}

const saksbehandlerCookieNavn = 'saksbehandlerinnstillinger';

export function getSaksbehandlerInstillingerCookieNavn() {
    const allCookies: Cookie = Cookies.get();
    const cookienavn = Object.keys(allCookies).find(
        key => key.includes(saksbehandlerCookieNavn) && !key.includes('timeout')
    );
    if (!cookienavn) {
        loggError(new Error(`Kunne ikke finne ${saksbehandlerCookieNavn}-cookie`));
    }
    return cookienavn;
}

export function getSaksbehandlerIdent(): string | undefined {
    const cookienavn = getSaksbehandlerInstillingerCookieNavn();
    if (cookienavn) {
        return cookienavn.split('-').pop();
    }
    return undefined;
}
