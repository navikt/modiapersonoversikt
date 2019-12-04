import * as Cookies from 'js-cookie';

interface Cookie {
    [name: string]: string;
}

export const saksbehandlerCookieNavnPrefix = 'saksbehandlerinnstillinger';

// Ikke bruk denne, vi prøver å skrive oss bort fra cookie. Du vil sikkert heller bruke useRestResource(resource => resource.innloggetSaksbehandler)
export function getSaksbehandlerEnhetFraCookieDeprecated(): string | undefined {
    const allCookies: Cookie = Cookies.get();
    const cookienavn = Object.keys(allCookies).find(
        key => key.includes(saksbehandlerCookieNavnPrefix) && !key.includes('timeout')
    );
    if (cookienavn) {
        return Cookies.get()[cookienavn];
    }
    return undefined;
}
