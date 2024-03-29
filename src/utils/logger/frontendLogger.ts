import { isDevelopment, isTest } from '../environment';
import * as Sentry from '@sentry/react';
import md5 from 'md5';
import { detect } from 'detect-browser';
import { useEffect } from 'react';
import { erKontaktsenter } from '../enheter-utils';
import innloggetSaksbehandler from '../../rest/resources/innloggetSaksbehandlerResource';
import { useValgtenhet } from '../../context/valgtenhet-state';

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
        tags: {
            action: action,
            location: location,
            erKontaktsenter: erKontaktsenter(enhet),
            ...extraTags
        }
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
        Sentry.captureMessage(message, { level: 'info', extra: ekstraFelter });
        window['frontendlogger'].info(info);
    }
}
export function loggWarning(
    error: Error,
    message?: string,
    ekstraFelter?: ValuePairs,
    ekstraTagsLoggEvent?: ValuePairs
) {
    if (isTest()) {
        return;
    }
    const browser = detect();
    const msg = `${message ? message + ': ' : ''} ${error.name} ${error.message}`;
    const info = {
        message: msg,
        url: document.URL,
        error: error.stack,
        browser: (browser && browser.name) || undefined,
        saksbehandler: ident,
        enhet: enhet,
        ...ekstraFelter
    };
    console.warn(info);
    if (uselogger()) {
        loggEvent('Warning', 'Logger', ekstraTagsLoggEvent);
        Sentry.captureException(error, { level: 'warning', extra: ekstraFelter });
        window['frontendlogger'].warn(info);
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
        Sentry.captureException(error, { level: 'error', extra: { ...ekstraFelter, ...ekstraTagsLoggEvent } });
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
