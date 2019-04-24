import * as React from 'react';
import { ReactNode } from 'react';
import { getTestStore } from './testStore';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import { AppState } from '../redux/reducers';

interface Props {
    children: ReactNode;
    customStore?: Store<AppState>;
}

function TestProvider({ children, customStore }: Props) {
    return (
        <Provider store={customStore || getTestStore()}>
            <StaticRouter context={{}}>
                <>{children}</>
            </StaticRouter>
        </Provider>
    );
}

export default TestProvider;
