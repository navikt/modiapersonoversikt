import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import AppWrapper from './AppWrapper';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import Routing from './routes/routing';
import UnderArbeid from '../components/underarbeid/UnderArbeid';
import { setupMock } from '../mock/setup-mock';
import { personOversiktTheme } from '../themes/personOversiktTheme';
import reducers from '../redux/reducer';

interface AppProps {

}

if (process.env.REACT_APP_MOCK === 'true') {
    setupMock();
}

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware, middleware)
);

class App extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={personOversiktTheme}>
                    <AppWrapper>
                        <nav id="header" />
                        <ConnectedRouter history={history}>
                            <Routing />
                        </ConnectedRouter>
                        <UnderArbeid />
                    </AppWrapper>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
