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
    return !isDevelopment() && frontendLoggerIsInitialized();
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
    window['frontendlogger'].event(event.table, event.fields, event.tags);
}

export function loggInfo(message: string, ekstraFelter?: ValuePairs) {
    const info = {
        message: message,
        ...ekstraFelter
    };
    if (useLogger()) {
        // tslint:disable-next-line
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
        // tslint:disable-next-line
        window['frontendlogger'].error(info);
    } else {
        console.error(info);
    }
}
