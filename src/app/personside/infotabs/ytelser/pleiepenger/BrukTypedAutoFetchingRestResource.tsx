import * as React from 'react';
import PlukkRestData, { BrukRestResourceDataOwnProps } from './PlukkRestData';

function BrukTypedAutoFetchingRestResource<T>(props: BrukRestResourceDataOwnProps<T>) {
    return <PlukkRestData {...props}>{data => props.children(data as T)}</PlukkRestData>;
}

export default BrukTypedAutoFetchingRestResource;
