import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import Routing from './routes/routing';
import UnderArbeid from '../components/underarbeid/UnderArbeid';
import { setupMock } from '../mock/setup-mock';
import reducers from '../redux/reducers';
import { mockEnabled } from '../api/config';
import AppWrapper, { Content } from './AppWrapper';
import Eventlistener from './Eventlistener';
import ModalWrapper from 'nav-frontend-modal';

if (mockEnabled) {
    setupMock();
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

class App extends React.Component<{}> {

    private appRef = React.createRef<HTMLElement>();

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        if (this.appRef.current) {
            ModalWrapper.setAppElement(this.appRef.current);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <AppWrapper innerRef={this.appRef}>
                    <nav id="header"/>
                    <BrowserRouter>
                        <Content>
                            <Eventlistener/>
                            <Routing/>
                        </Content>
                    </BrowserRouter>
                    <UnderArbeid/>
                </AppWrapper>
            </Provider>
        );
    }
}

export default App;
