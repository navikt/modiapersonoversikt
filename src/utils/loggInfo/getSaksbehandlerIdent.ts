import * as Cookies from 'js-cookie';
import { loggErrorUtenSaksbehandlerIdent } from '../frontendLogger';

let saksbehandlerinnstillerCookieFeilErLogget = false;

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
        if (mockEnabled) {
            Cookies.set(saksbehandlerCookieNavn + '-Z990099', '4100');
        }
        if (!saksbehandlerinnstillerCookieFeilErLogget) {
            loggErrorUtenSaksbehandlerIdent(new Error(`Kunne ikke finne ${saksbehandlerCookieNavn}-cookie`));
            saksbehandlerinnstillerCookieFeilErLogget = true;
        }
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
