import * as React from 'react';
import { Router as OriginalRouter } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';

export const history =
    process.env.REACT_APP_USE_HASH_ROUTER === 'true'
        ? createHashHistory()
        : createBrowserHistory({ basename: process.env.PUBLIC_URL });
function Router(props: { children?: React.ReactNode }) {
    return <OriginalRouter history={history}>{props.children}</OriginalRouter>;
}

export default Router;
