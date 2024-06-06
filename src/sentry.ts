import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const fnrMask = /\d{11}/g;
function clientSideMasking<T>(data: T): T {
    const serialized = JSON.stringify(data);
    const sanitized = serialized.replace(fnrMask, '***********');
    return JSON.parse(sanitized) as T;
}

if (process.env.NODE_ENV === 'production') {
    const isProd = window.location.host === 'app.adeo.no';
    Sentry.init({
        dsn: 'https://ed466c6158934594b66801b0c194f275@sentry.gc.nav.no/149',
        integrations: [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            new BrowserTracing({
                routingInstrumentation: Sentry.reactRouterV5Instrumentation(window.history)
            })
        ],
        environment: isProd ? 'prod' : 'preprod',
        release: '$env{APP_VERSION}',
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 0,
        maxBreadcrumbs: 10,
        beforeBreadcrumb: clientSideMasking,
        beforeSend: clientSideMasking,
        autoSessionTracking: false
    });
}
