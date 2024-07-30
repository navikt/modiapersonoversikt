import React, { ComponentProps } from 'react';
import { FaroRoute } from '@grafana/faro-react';
import { Route } from 'react-router-dom';

export const SentryRoute = ({
    children,
    ...props
}: ComponentProps<typeof FaroRoute> & ComponentProps<typeof Route>) => {
    // if (window.faro) {
    //     return <FaroRoute {...props}>{children}</FaroRoute>;
    // }
    return <Route {...props}>{children}</Route>;
};
