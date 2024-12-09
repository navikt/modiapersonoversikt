import { detect } from 'detect-browser';
import { useEffect } from 'react';
import { useValgtenhet } from '../../context/valgtenhet-state';
import innloggetSaksbehandler from '../../rest/resources/innloggetSaksbehandlerResource';
import { erKontaktsenter } from '../enheter-utils';
import { isDevelopment, isTest } from '../environment';

let ident = 'ikke satt';
let enhet = 'ikke valgt';

export function useInitializeLogger() {
    const innloggetSaksbehandlerResource = innloggetSaksbehandler.useFetch();
    const valgtEnhet = useValgtenhet().enhetId;

    useEffect(() => {
        if (innloggetSaksbehandlerResource.data) {
            ident = innloggetSaksbehandlerResource.data.ident;
            enhet = valgtEnhet;
        }
    }, [innloggetSaksbehandlerResource, valgtEnhet]);
}

interface ValuePairs {
    [name: string]: string | number | boolean | object | undefined;
}

const faro = window.faro;

function frontendLoggerIsInitialized(): boolean {
    if (!faro) {
        console.warn('grafana faro er ikke satt opp riktig');
        return false;
    }
    return true;
}

function uselogger(): boolean {
    return !isDevelopment() && frontendLoggerIsInitialized();
}

export function loggEvent(action: string, location: string, extraTags?: ValuePairs, fields?: ValuePairs) {
    if (!uselogger()) {
        return;
    }
    faro?.api.pushEvent(action, {
        ...fields,
        location: location,
        erKontaktsenter: erKontaktsenter(enhet).toString(),
        ...extraTags
    });
}

export function loggInfo(message: string, ekstraFelter?: ValuePairs) {
    if (isTest()) {
        return;
    }
    console.info(message, ekstraFelter);
}
export function loggWarning(error: Error, message?: string, ekstraFelter?: ValuePairs) {
    if (isTest()) {
        return;
    }
    const browser = detect();
    const msg = `${message ? `${message}: ` : ''} ${error.name} ${error.message}`;
    const info = {
        url: document.URL,
        error: error.stack,
        browser: browser?.name || undefined,
        saksbehandler: ident,
        enhet: enhet,
        ...ekstraFelter
    };
    console.warn(msg, info);
}

export function loggError(error: Error, message?: string, ekstraFelter?: ValuePairs) {
    if (isTest()) {
        return;
    }
    const browser = detect();
    const logLine = `${message ? `${message}: ` : ''} ${error.name} ${error.message}`;
    const info = {
        url: document.URL,
        error: error.stack,
        browser: browser?.name || undefined,
        saksbehandler: ident,
        enhet: enhet,
        ...ekstraFelter
    };
    console.error(logLine, info);
}

export function emptyStringToUndefined(valuePairs: ValuePairs) {
    return Object.keys(valuePairs).reduce(
        (acc, key: string) => {
            const value = valuePairs[key] === '' ? undefined : valuePairs[key]?.toString();

            return value
                ? {
                      ...acc,
                      [key]: value
                  }
                : acc;
        },
        {} as Record<string, string>
    );
}
