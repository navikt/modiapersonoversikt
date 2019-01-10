import * as Cookies from 'js-cookie';

interface Cookie {
    [name: string]: string;
}

export function getSaksbehandlerInstillingerCookieNavn() {
    const allCookies: Cookie = Cookies.get();
    const cookienavn = Object.keys(allCookies)
        .find(key => key.includes('saksbehandlerinnstillinger') && !key.includes('timeout'));
    return cookienavn;
}

export  function getSaksbehandlerIdent(): string | undefined {
    const cookienavn = getSaksbehandlerInstillingerCookieNavn();
    if (cookienavn) {
        return cookienavn.split('-').pop();
    }
    return undefined;
}