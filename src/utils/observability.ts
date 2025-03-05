import {
    type Instrumentation,
    type Meta,
    ReactIntegration,
    getWebInstrumentations,
    initializeFaro
} from '@grafana/faro-react';
import { getEnvFromHost } from './environment';

const customPageMeta: () => Pick<Meta, 'page'> = () => {
    const maskedUrl = location.href.replaceAll(/\d{11}/g, '***********');

    return {
        page: {
            url: maskedUrl
        }
    };
};

export const initializeObservability = () => {
    const env = getEnvFromHost();

    try {
        initializeFaro({
            url:
                (import.meta.env.VITE_GRAFANA_COLLECTOR as string) ??
                (env === 'prod' ? 'https://telemetry.nav.no/collect' : 'https://telemetry.ekstern.dev.nav.no/collect'),
            app: {
                name: 'modiapersonoversikt'
            },
            metas: [customPageMeta],
            paused: !import.meta.env.PROD || import.meta.env.VITE_GH_PAGES,
            instrumentations: [...getWebInstrumentations(), new ReactIntegration()].filter(
                (v): v is Instrumentation => !!v
            ),
            ignoreUrls: [/\d{11}/]
        });
    } catch (e) {
        console.warn('Could not initialize Faro', e);
    }
};
