import { isDevelopment } from './environment';

interface ValuePairs {
     [name: string]: string | number | boolean | object | undefined;
}

function frontendLoggerIsInitialized(): boolean {
    // tslint:disable-next-line
    if (!window['frontendlogger']) {
        console.warn('frontend-logger er ikke satt opp riktig');
        return false;
    }
    return true;
}

function useLogger(): boolean {
    return frontendLoggerIsInitialized() && !isDevelopment();
}

export function loggEvent(action: string, location: string, extraTags?: ValuePairs, fields?: ValuePairs) {
    if (!useLogger()) {
        return;
    }
    const event = {
        table: 'modiapersonoversikt',
        fields: fields || {},
        tags: {action: action, location: location, ...extraTags}
    };
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].event(event.table, event.fields, event.tags);
}

export function loggInfo(message: string, ekstraFelter?: ValuePairs) {
    const info = {
        message: message,
        ...ekstraFelter
    };
    console.info(info);
    if (!useLogger()) {
        return;
    }
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].info(info);
}

export function loggError(error: Error, message?: string, ekstraFelter?: ValuePairs) {
    const info = {
        message: `${message ? message + ': ' : ''} ${error.name} ${error.message}`,
        error: error.stack,
        ...ekstraFelter
    };
    console.error(info);
    if (!useLogger()) {
        return;
    }
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].error(info);
}
