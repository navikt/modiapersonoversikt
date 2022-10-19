import * as React from 'react';
import useFetchHook, { isPending, hasError, FetchResult, Config as HookConfig } from '@nutgaard/use-fetch';
import { UseQueryResult } from '@tanstack/react-query';

type ReactElement = React.ReactElement | null;

export interface Config<T> {
    ifPending: ReactElement | (() => ReactElement);
    ifError: ReactElement | ((error: any) => ReactElement);
    ifData: (data: T) => ReactElement;
}

export type RendererOrConfig<T> = ((data: T) => ReactElement) | (Partial<Config<T>> & Pick<Config<T>, 'ifData'>);
export type DefaultConfig = Omit<Config<any>, 'ifData'>;

export function applyDefaults<T>(defaults: DefaultConfig, renderer: RendererOrConfig<T>): Config<T> {
    if (typeof renderer === 'function') {
        return { ...defaults, ifData: renderer };
    } else {
        return { ...defaults, ...renderer };
    }
}

const includeCredentials: RequestInit = { credentials: 'include' };
export function useFetch<T>(url: string, hookConfig?: HookConfig): FetchResult<T> {
    return useFetchHook<T>(url, includeCredentials, hookConfig);
}
export function useRest<T>(url: string, config: Config<T>, hookConfig?: HookConfig): ReactElement {
    const response: FetchResult<T> = useFetch<T>(url, hookConfig);
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
export function useRQRest<TData = unknown, TError = unknown>(
    response: UseQueryResult<TData, TError>,
    config: Config<TData>
): ReactElement {
    if (response.isLoading) {
        if (typeof config.ifPending === 'function') {
            return config.ifPending();
        } else {
            return config.ifPending;
        }
    } else if (response.isError) {
        if (typeof config.ifError === 'function') {
            return config.ifError(response.error);
        } else {
            return config.ifError;
        }
    } else {
        return config.ifData(response.data);
    }
}
