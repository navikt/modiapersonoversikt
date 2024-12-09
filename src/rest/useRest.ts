import type { UseQueryResult } from '@tanstack/react-query';
import type * as React from 'react';

type ReactElement = React.ReactElement | null;

interface Config<T> {
    ifPending: ReactElement | (() => ReactElement);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ifError: ReactElement | ((error: any) => ReactElement);
    ifData: (data: T) => ReactElement;
}

export type RendererOrConfig<T> = ((data: T) => ReactElement) | (Partial<Config<T>> & Pick<Config<T>, 'ifData'>);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultConfig = Omit<Config<any>, 'ifData'>;

export function applyDefaults<T>(defaults: DefaultConfig, renderer: RendererOrConfig<T>): Config<T> {
    if (typeof renderer === 'function') {
        return { ...defaults, ifData: renderer };
    }
    return { ...defaults, ...renderer };
}

export function useRest<TData = unknown, TError = unknown>(
    response: UseQueryResult<TData, TError>,
    config: Config<TData>
): ReactElement {
    if (response.isLoading) {
        if (typeof config.ifPending === 'function') {
            return config.ifPending();
        }
        return config.ifPending;
    }
    if (response.isError) {
        if (typeof config.ifError === 'function') {
            return config.ifError(response.error);
        }
        return config.ifError;
    }
    return config.ifData(response.data);
}
