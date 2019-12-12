import { isDevelopment, isTest } from './environment';
import md5 from 'md5';
import { detect } from 'detect-browser';
import { erNyePersonoversikten } from './erNyPersonoversikt';
import { useRestResource } from './customHooks';
import { useEffect } from 'react';
import { hasData } from '../rest/utils/restResource';

let ident = 'ikke satt';
let enhet = 'ikke valgt';

export function useInitializeLogger() {
    const innloggetSaksbehResource = useRestResource(resources => resources.innloggetSaksbehandler);

    useEffect(() => {
        if (hasData(innloggetSaksbehResource)) {
            ident = innloggetSaksbehResource.data.ident;
            enhet = innloggetSaksbehResource.data.enhetId;
        }
    }, [innloggetSaksbehResource]);
}

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
    if (!uselogger()) {
        return;
    }
    const event = {
        table: 'modiapersonoversikt',
        fields: { ...fields, identHash: md5(ident) },
        tags: { action: action, location: location, erNyePersonoversikten: erNyePersonoversikten(), ...extraTags }
    };
    window['frontendlogger'].event(
        event.table,
        emptyStringToUndefined(event.fields),
        emptyStringToUndefined(event.tags)
    );
}

export function loggInfo(message: string, ekstraFelter?: ValuePairs) {
    if (isTest()) {
        return;
    }
    const info = {
        message: message,
        ...ekstraFelter
    };
    console.info(info);
    if (uselogger()) {
        window['frontendlogger'].info(info);
    }
}

export function loggError(error: Error, message?: string, ekstraFelter?: ValuePairs, ekstraTagsLoggEvent?: ValuePairs) {
    if (isTest()) {
        return;
    }
    const browser = detect();
    const info = {
        message: `${message ? message + ': ' : ''} ${error.name} ${error.message}`,
        url: document.URL,
        error: error.stack,
        browser: (browser && browser.name) || undefined,
        saksbehandler: ident,
        enhet: enhet,
        ...ekstraFelter
    };
    console.error(info);
    if (uselogger()) {
        loggEvent('Error', 'Logger', ekstraTagsLoggEvent);
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
