interface FieldsAndTags {
    fields?: { [name: string]: string | number | boolean };
    tags?: { [tagNavn: string]: string };
}

function frontendLoggerIsInitialized(): boolean {
    // tslint:disable-next-line
    if (!window['frontendlogger']) {
        console.warn('frontend-logger er ikke satt opp riktig');
        return false;
    }
    return true;
}

export function loggEvent(eventName: string, fieldsAndTags?: FieldsAndTags) {
    if (!frontendLoggerIsInitialized()) {
        return;
    }
    const event = {
        eventName: 'modiapersonoversikt.' + eventName,
        fields: fieldsAndTags && fieldsAndTags.fields || {},
        tags: fieldsAndTags && fieldsAndTags.tags || {}
    };
    console.log('event: ', event);
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].event(event.eventName, event.fields, event.tags);
}

export function loggInfo(message: string, ekstraFelter?: { [name: string]: string | number | boolean}) {
    if (!frontendLoggerIsInitialized()) {
        return;
    }
    const info = {
        message: message,
        ...ekstraFelter
    };
    console.log('info:', info);
    // tslint:disable-next-line
    window['frontendlogger'] && window['frontendlogger'].info(info);
}
