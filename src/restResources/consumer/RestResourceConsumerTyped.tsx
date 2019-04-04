import * as React from 'react';
import RestResourceConsumer, { BrukRestResourceDataOwnProps } from './RestResourceConsumer';

function RestResourceConsumerTyped<T>(props: BrukRestResourceDataOwnProps<T>) {
    const { children, ...resten } = props;
    return <RestResourceConsumer {...resten}>{data => children(data as T)}</RestResourceConsumer>;
}

export default RestResourceConsumerTyped;
