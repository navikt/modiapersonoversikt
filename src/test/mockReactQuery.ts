import type { UseQueryResult } from '@tanstack/react-query';
import type { MockInstance } from 'vitest';
import type { FetchError } from '../api/api';

export function mockReactQuery<A extends unknown[], R>(
    resource: (...args: A) => UseQueryResult<R>,
    data: R,
    extra?: Partial<Omit<UseQueryResult<R>, 'data'>>
) {
    (resource as unknown as MockInstance<(...args: A) => Partial<UseQueryResult<R>>>).mockImplementation(
        () =>
            ({
                data,
                ...extra
            }) as Partial<UseQueryResult<R, FetchError>>
    );
}
