import * as React from 'react';
import { ReactNode } from 'react';
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

    const resource = useRestResource(getResource, placeholderProps, true);

    if (!resource.data) {
        return resource.placeholder;
    }

    return <>{children(resource.data)}</>;
}

export default RestResourceConsumer;
