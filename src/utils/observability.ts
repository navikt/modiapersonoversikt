import {
    getWebInstrumentations,
    type Instrumentation,
    initializeFaro,
    ReactIntegration,
    type TransportItem
} from '@grafana/faro-react';
import { getEnvFromHost } from './environment';

const stripItem = (item: TransportItem): TransportItem | null => {
    // Strip query parameters from page URLs (may contain tokens, codes, identifiers)
    if (item.meta?.page?.url) {
        try {
            const url = new URL(item.meta.page.url);
            url.search = '';
            item.meta.page.url = url.toString();
        } catch {
            /* ignore malformed URLs */
        }
    }

    // Drop items that may contain fødselsnummer (11-digit pattern)
    const payload = JSON.stringify(item);
    if (/\d{11}/.test(payload)) {
        return null;
    }
    return item;
};

export const initializeObservability = () => {
    const env = getEnvFromHost();

    try {
        initializeFaro({
            url:
                (import.meta.env.VITE_GRAFANA_COLLECTOR as string) ??
                (env === 'prod' ? 'https://telemetry.nav.no/collect' : 'https://telemetry.ekstern.dev.nav.no/collect'),
            app: {
                name: 'modiapersonoversikt',
                namespace: 'personoversikt'
            },
            paused: window.location.hostname === 'localhost' || import.meta.env.VITE_GH_PAGES,
            instrumentations: [...getWebInstrumentations(), new ReactIntegration()].filter(
                (v): v is Instrumentation => !!v
            ),
            ignoreUrls: [/\d{11}/],
            beforeSend: stripItem
        });
    } catch (e) {
        console.warn('Could not initialize Faro', e);
    }
};
