import * as amplitude from '@amplitude/analytics-browser';

let amplitudeInstance: amplitude.Types.BrowserClient | undefined = undefined;

declare global {
    interface Window {
        amplitude: typeof amplitudeInstance;
    }
}

const getApiKey = () => {
    if (
        window.location.href.includes('app.adeo.no') ||
        window.location.href.includes('modiapersonoversikt.intern.nav.no')
    ) {
        return import.meta.env.VITE_AMPLITUDE_API_KEY as string;
    }
    return import.meta.env.VITE_AMPLITUDE_API_KEY_DEV as string;
};

const maskereFodselsnummer = (data?: amplitude.Types.Event) => {
    const maskertObjekt = JSON.stringify(data).replace(/\d{11}/g, (_, indexOfMatch: number, fullString: string) =>
        fullString.charAt(indexOfMatch - 2) === ':' ? '"***********"' : '***********'
    );

    try {
        return JSON.parse(maskertObjekt) as amplitude.Types.Event;
    } catch (e) {
        console.error('kunne ikke maskere data korrekt før sending til amplitude');
        console.error(e);
    }
    return null;
};

const maskereFnrPlugin = (): amplitude.Types.BeforePlugin => ({
    type: 'before',
    execute: (event) => {
        const maskertEvent = maskereFodselsnummer(event);
        return Promise.resolve(maskertEvent);
    }
});

export const initAmplitude = () => {
    if (!import.meta.env.PROD || import.meta.env.VITE_GH_PAGES) return;
    if (window.amplitude) {
        return;
    }
    amplitudeInstance = amplitude.createInstance();
    amplitudeInstance.init(getApiKey() ?? '', undefined, {
        serverUrl: 'https://amplitude.nav.no/collect',
        serverZone: 'EU',
        ingestionMetadata: {
            sourceName: window.location.origin
        },
        defaultTracking: {
            attribution: false,
            pageViews: true,
            sessions: true,
            formInteractions: false,
            fileDownloads: false
        }
    });

    window.addEventListener('pagehide', () => {
        amplitudeInstance?.setTransport('beacon');
        amplitudeInstance?.flush();
    });

    amplitudeInstance.add(maskereFnrPlugin());
    window.amplitude = amplitudeInstance;
    return amplitudeInstance;
};

//@ts-ignore
const _trackPageView = () => {
    if (!amplitudeInstance) {
        console.warn('Amplitude is not initialized. Ignoring');
        return;
    }
    amplitudeInstance.track({ event_type: 'besøk' });
};

export const trackNavigation = (destination: string, linkText: string) => {
    if (!amplitudeInstance) {
        console.warn('Amplitude is not initialized. Ignoring');
        return;
    }
    amplitudeInstance.track({
        event_type: 'navigere',
        event_properties: {
            lenketekst: linkText,
            destinasjon: destination
        }
    });
};

export const trackAccordionOpened = (name: string) => {
    if (!amplitudeInstance) {
        console.warn('Amplitude is not initialized. Ignoring');
        return;
    }
    amplitudeInstance.track({
        event_type: 'accordion åpnet',
        event_properties: {
            tekst: name
        }
    });
};

export const trackAccordionClosed = (name: string) => {
    if (!amplitudeInstance) {
        console.warn('Amplitude is not initialized. Ignoring');
        return;
    }
    amplitudeInstance.track({
        event_type: 'accordion lukket',
        event_properties: {
            tekst: name
        }
    });
};

export const updateUserEnhet = (enhet: string) => {
    if (!amplitudeInstance) {
        console.warn('Amplitude is not initialized. Ignoring');
        return;
    }

    const identifyEvent = new amplitude.Identify();
    identifyEvent.set('enhet', enhet);

    amplitudeInstance.identify(identifyEvent);
};
