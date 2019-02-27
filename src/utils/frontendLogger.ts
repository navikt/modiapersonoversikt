import { isDevelopment } from './environment';
import { getSaksbehandlerIdent } from './loggInfo/getSaksbehandlerIdent';
import md5 from 'md5';

interface ValuePairs {
    [name: string]: string | number | boolean | object | undefined;
}

function frontendLoggerIsInitialized(): boolean {
    // @ts-ignore
    if (!window['frontendlogger']) {
        console.warn('frontend-logger er ikke satt opp riktig');
        return false;
    }
    return true;
}

function useLogger(): boolean {
    return !isDevelopment() && frontendLoggerIsInitialized();
}

export function loggEvent(action: string, location: string, extraTags?: ValuePairs, fields?: ValuePairs) {
    if (!useLogger()) {
        return;
    }
    const identHash = md5(getSaksbehandlerIdent() || '');
    const event = {
        table: 'modiapersonoversikt',
        fields: { ...fields, identHash: identHash },
        tags: { action: action, location: location, ...extraTags }
    };
    // @ts-ignore
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
    if (useLogger()) {
        // @ts-ignore
        window['frontendlogger'].info(info);
    } else {
        console.info(info);
    }
}

export function loggError(error: Error, message?: string, ekstraFelter?: ValuePairs) {
    const info = {
        message: `${message ? message + ': ' : ''} ${error.name} ${error.message}`,
        error: error.stack,
        ...ekstraFelter
    };
    if (useLogger()) {
        // @ts-ignore
        window['frontendlogger'].error(info);
    } else {
        console.error(info);
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
