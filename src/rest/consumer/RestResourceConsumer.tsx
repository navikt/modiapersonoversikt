import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { RestResource } from '../utils/restResource';
import { RestEndepunkter } from '../../redux/restReducers/restReducers';
import { useRestResource } from './useRestResource';
import { RestResourcePlaceholderProps } from './placeholder';

export type Props<T> = {
    getResource: (restResources: RestEndepunkter) => RestResource<T>;
    children: (data: T) => ReactNode;
} & RestResourcePlaceholderProps;

function RestResourceConsumer<T>(props: Props<T>) {
    const { getResource, children, ...placeholderProps } = props;
    // Plukker hvert enkelt element fra `placeholderProps` slik at objektet ikke styrer memoiseringen
    const memomizedPlaceholder = useMemo(
        () => placeholderProps,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            placeholderProps.placeholderKey,
            placeholderProps.returnOnError,
            placeholderProps.returnOnPending,
            placeholderProps.returnOnNotFound,
            placeholderProps.returnOnForbidden,
            placeholderProps.spinnerSize
        ]
    );
    const resource = useRestResource(getResource, memomizedPlaceholder, true);

    if (!resource.data) {
        return resource.placeholder;
    }

    return <>{children(resource.data)}</>;
}

export default RestResourceConsumer;
