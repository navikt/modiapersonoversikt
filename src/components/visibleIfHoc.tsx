import React from 'react';

export type WithVisibleIf = { visible: boolean };

export default function visibleIf<T>(Component: React.ComponentType<T>): React.ComponentType<T & WithVisibleIf> {
    return (props: T & WithVisibleIf) => {
        const { visible, ...rest } = props;
        return visible ? <Component {...(rest as unknown) as T} /> : null;
    };
}
