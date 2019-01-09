import * as Cookies from 'js-cookie';

interface Cookie {
    [name: string]: string;
}

export  function getSaksbehandlerIdent(): string | undefined {
    const allCookies: Cookie = Cookies.get();
    const cookienavn = Object.keys(allCookies).find(key => key.includes('saksbehandlerinnstillinger'));
    if (cookienavn) {
        return cookienavn.split('-').pop();
    }
    return undefined;
}