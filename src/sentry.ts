import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const sentryTracingKeys = ['baggage', 'sentry-trace'];
const appDTracingKeys = ['ADRUM'];
export function tracingAwareKeyGenerator(url: string, option?: RequestInit) {
    const method = (option && option.method) || 'GET';
    const body = (option && option.body && option.body.toString()) || '';
    const headers = (option && option.headers) || {};
    const sanitizedHeaders = Object.fromEntries(
        Object.entries(headers).filter(([key, _]) => {
            if (sentryTracingKeys.includes(key)) {
                return false;
            } else if (appDTracingKeys.includes(key)) {
                return false;
            } else {
                return true;
            }
        })
    );

    return [url, method.toUpperCase(), body, JSON.stringify(sanitizedHeaders)].join('||');
}

const fnrMask = /\d{11}/g;
function mask(value?: string): string | undefined {
    if (value === undefined) {
        return undefined;
    }
    return value.replace(fnrMask, '***********');
}

function clientSideMasking(event: Sentry.Event): Sentry.Event {
    const url = event.request?.url ? mask(event.request.url) : '';
    return {
        ...event,
        request: {
            ...event.request,
            url,
            headers: {
                Referer: mask(event.request?.headers?.Referer) || ''
            }
        },
        breadcrumbs: (event.breadcrumbs || []).map((it) => ({
            ...it,
            data: {
                ...it.data,
                url: mask(it.data?.url),
                from: mask(it.data?.from),
                to: mask(it.data?.to)
            }
        }))
    };
}

if (process.env.NODE_ENV === 'production') {
    const dynamicSampleRate = window.location.search.includes('sentry-sample') ? 1.0 : 0.0;
    const isProd = window.location.host === 'app.adeo.no';
    Sentry.init({
        dsn: 'https://5f3951672e1b49b5a8bca188bf4ad44f@sentry.gc.nav.no/148',
        integrations: [
            new BrowserTracing({
                routingInstrumentation: Sentry.reactRouterV5Instrumentation(window.history)
            })
        ],
        environment: isProd ? 'prod' : 'preprod',
        release: '$env{APP_VERSION}',
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: dynamicSampleRate,
        beforeSend: clientSideMasking,
        autoSessionTracking: false
    });
}
