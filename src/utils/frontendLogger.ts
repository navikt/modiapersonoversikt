import { isDevelopment } from './environment';
import { getSaksbehandlerIdent } from './loggInfo/getSaksbehandlerIdent';
import md5 from 'md5';
import { detect } from 'detect-browser';
import { erNyePersonoversikten } from './erNyPersonoversikt';

interface ValuePairs {
    [name: string]: string | number | boolean | object | undefined;
}

function frontendLoggerIsInitialized(): boolean {
    if (!window['frontendlogger']) {
        console.warn('frontend-logger er ikke satt opp riktig');
        return false;
    }
    return true;
}

function uselogger(): boolean {
    return !isDevelopment() && frontendLoggerIsInitialized();
}

export function loggEvent(action: string, location: string, extraTags?: ValuePairs, fields?: ValuePairs) {
    loggEventUtenIdentHash(action, location, extraTags, fields, md5(getSaksbehandlerIdent() || ''));
}

function loggEventUtenIdentHash(
    action: string,
    location: string,
    extraTags?: ValuePairs,
    fields?: ValuePairs,
    identHash?: string
) {
    if (!uselogger()) {
        return;
    }
    const event = {
        table: 'modiapersonoversikt',
        fields: { ...fields, identHash: identHash },
        tags: { action: action, location: location, erNyePersonoversikten: erNyePersonoversikten(), ...extraTags }
    };
    window['frontendlogger'].event(
        event.table,
        emptyStringToUndefined(event.fields),
        emptyStringToUndefined(event.tags)
    );
}

export function loggInfo(message: string, ekstraFelter?: ValuePairs) {
    const info = {
        message: message,
        ...ekstraFelter
    };
    console.info(info);
    if (uselogger()) {
        window['frontendlogger'].info(info);
    }
}

export function loggError(error: Error, message?: string, ekstraFelter?: ValuePairs) {
    loggErrorUtenSaksbehandlerIdent(error, message, { ...ekstraFelter, saksbehandler: getSaksbehandlerIdent() });
}

export function loggErrorUtenSaksbehandlerIdent(error: Error, message?: string, ekstraFelter?: ValuePairs) {
    const browser = detect();
    const info = {
        message: `${message ? message + ': ' : ''} ${error.name} ${error.message}`,
        url: document.URL,
        error: error.stack,
        browser: (browser && browser.name) || undefined,
        ...ekstraFelter
    };
    console.error(info);
    if (uselogger()) {
        loggEventUtenIdentHash('Error', 'Logger');
        window['frontendlogger'].error(info);
    }
}

export function emptyStringToUndefined(valuePairs: ValuePairs) {
    return Object.keys(valuePairs).reduce(
        (acc: ValuePairs, key: string) => ({
            ...acc,
            [key]: valuePairs[key] === '' ? undefined : valuePairs[key]
        }),
        {}
    );
}
