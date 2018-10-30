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

export function loggEvent(action: string, location: string, extraTags?: ValuePairs, fields?: ValuePairs) {
    if (!frontendLoggerIsInitialized()) {
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
    if (!frontendLoggerIsInitialized()) {
        return;
    }
    const info = {
        message: message,
        ...ekstraFelter
    };
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].info(info);
}

export function loggError(message: string, error: Error, ekstraFelter?: ValuePairs) {
    if (!frontendLoggerIsInitialized()) {
        return;
    }
    const info = {
        message: message,
        error: error.stack,
        ...ekstraFelter
    };
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].error(info);
}
