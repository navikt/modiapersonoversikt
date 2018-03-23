import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';

import UnderArbeid from './components/underarbeid/UnderArbeid';
import { setupMock } from './mock/setup-mock';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import reducers from './redux/reducer';
import Routing from './routes/routing';

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
                <div className={'personoversikt'}>
                    <nav id="header" />
                    <UnderArbeid />
                    <ConnectedRouter history={history}>
                        <Routing />
                    </ConnectedRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
