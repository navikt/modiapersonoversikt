import * as amplitude from '@amplitude/analytics-browser';

let amplitudeInstance: amplitude.Types.BrowserClient | undefined = undefined;

declare global {
    interface Window {
        amplitude: typeof amplitudeInstance;
    }
}

const getApiKey = () => {
    if (window.location.href.includes('app.adeo.no')) {
        return process.env.REACT_APP_AMPLITUDE_API_KEY;
    }
    return process.env.REACT_APP_AMPLITUDE_API_KEY_DEV;
};

const maskereFodselsnummer = (data?: amplitude.Types.Event) => {
    const maskertObjekt = JSON.stringify(data).replace(/\d{11}/g, (_, indexOfMatch, fullString) =>
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

export const maskereFnrPlugin = (): amplitude.Types.BeforePlugin => ({
    type: 'before',
    execute: async (event) => {
        const maskertEvent = maskereFodselsnummer(event);
        return maskertEvent;
    }
});

export const initAmplitude = () => {
    if (window.amplitude) {
        return;
    }
    amplitudeInstance = amplitude.createInstance();
    amplitudeInstance.init(getApiKey() ?? '', undefined, {
        serverUrl: 'https://amplitude.nav.no/collect',
        serverZone: 'EU',
        ingestionMetadata: {
            sourceName: window.location.origin
        }
    });

    amplitudeInstance.add(maskereFnrPlugin());
    window.amplitude = amplitudeInstance;
    return amplitudeInstance;
};

export const trackPageView = () => {
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

export default initAmplitude;
