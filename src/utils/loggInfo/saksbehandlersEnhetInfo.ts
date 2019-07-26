import * as Cookies from 'js-cookie';
import { getSaksbehandlerInstillingerCookieNavn } from './getSaksbehandlerIdent';

export function getSaksbehandlerEnhet(): string | undefined {
    const cookienavn = getSaksbehandlerInstillingerCookieNavn();
    if (cookienavn) {
        return Cookies.get()[cookienavn];
    }
    return undefined;
}

export function erKontaktsenter(): boolean | undefined {
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
