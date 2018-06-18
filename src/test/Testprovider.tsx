import * as React from 'react';
import { personOversiktTheme } from '../themes/personOversiktTheme';
import { testStore } from './setupTests';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';

interface Props {
    children: React.ReactChildren | React.ReactChild | JSX.Element[];
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
