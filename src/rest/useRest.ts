import * as React from 'react';
import useFetchHook, { isPending, hasError, FetchResult } from '@nutgaard/use-fetch';

export interface Config<T> {
    ifPending: React.ReactElement | (() => React.ReactElement);
    ifError: React.ReactElement | ((error: any) => React.ReactElement);
    ifData: (data: T) => React.ReactElement;
}

export type RendererOrConfig<T> = ((data: T) => React.ReactElement) | (Partial<Config<T>> & Pick<Config<T>, 'ifData'>);
export type DefaultConfig = Omit<Config<any>, 'ifData'>;

export function applyDefaults<T>(defaults: DefaultConfig, renderer: RendererOrConfig<T>): Config<T> {
    if (typeof renderer === 'function') {
        return { ...defaults, ifData: renderer };
    } else {
        return { ...defaults, ...renderer };
    }
}

const includeCredentials: RequestInit = { credentials: 'include' };
export function useFetch<T>(url: string): FetchResult<T> {
    return useFetchHook<T>(url, includeCredentials);
}
export function useRest<T>(url: string, config: Config<T>): React.ReactElement {
    const response: FetchResult<T> = useFetch<T>(url);
    if (isPending(response)) {
        if (typeof config.ifPending === 'function') {
            return config.ifPending();
        } else {
            return config.ifPending;
        }
    } else if (hasError(response)) {
        if (typeof config.ifError === 'function') {
            return config.ifError(response.error);
        } else {
            return config.ifError;
        }
    } else {
        return config.ifData(response.data);
    }
}
