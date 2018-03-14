import * as qs from 'query-string';

export function delayed(time: number, response: object) {
    return () => new Promise((resolve) => setTimeout(() => resolve(response), time));
}

interface Config {
    body: string;
}

export function respondWith(handler: (url: string, config: Config, request: object) => void) {
    return (url: string, config: Config, extra: object) => {
        const queryParams = qs.parse(qs.extract(url));
        const bodyParams = config && config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, { queryParams, bodyParams, extra });
        } else {
            response = handler; // Trust me, its data
        }

        /* tslint:disable */
        if (console.groupCollapsed) {
            console.groupCollapsed(url);
            console.groupCollapsed('config');
            console.log('url', url);
            console.log('config', config);
            console.log('queryParams', queryParams);
            console.log('bodyParams', bodyParams);
            console.log('extra', extra);
            console.groupEnd();

            console.log('response', response);
            console.groupEnd();
        }
        /* tslint:enable */
        return response;
    };
}

let seed = 42;

export function random(): number {
    const x = Math.sin(seed++) * 100000;
    return x - Math.floor(x);
}
