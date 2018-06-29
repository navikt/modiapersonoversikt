import * as React from 'react';
import { personOversiktTheme } from '../themes/personOversiktTheme';
import { testStore } from './setupTests';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

function TestProvider({ children }: Props) {
    return (
        <Provider store={testStore}>
            <ThemeProvider theme={personOversiktTheme}>
                <StaticRouter context={{}}>
                    {children}
                </StaticRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default TestProvider;
