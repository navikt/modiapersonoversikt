import * as React from 'react';
import { testStore } from './setupTests';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function TestProvider({children}: Props) {
    return (
        <Provider store={testStore}>
            <StaticRouter context={{}}>
                {children}
            </StaticRouter>
        </Provider>
    );
}

export default TestProvider;
