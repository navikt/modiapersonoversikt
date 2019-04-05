import * as React from 'react';
import RestResourceConsumerUntyped, { RestResourceConsumerOwnProps } from './RestResourceConsumerUntyped';

function RestResourceConsumer<T>(props: RestResourceConsumerOwnProps<T>) {
    const { children, ...resten } = props;
    return <RestResourceConsumerUntyped {...resten}>{data => children(data as T)}</RestResourceConsumerUntyped>;
}

export default RestResourceConsumer;
