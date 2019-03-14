import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/routing';
import { setupMock } from '../mock/setup-mock';
import reducers from '../redux/reducers';
import { mockEnabled } from '../api/config';
import AppWrapper, { Content } from './AppWrapper';
import ModalWrapper from 'nav-frontend-modal';
import { composeWithDevTools } from 'redux-devtools-extension';
import PersonOppslagHandler from './PersonOppslagHandler/PersonOppslagHandler';
import Decorator from './Decorator';

if (mockEnabled) {
    setupMock();
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

class App extends React.Component<{}> {
    private appRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        if (this.appRef.current) {
            ModalWrapper.setAppElement(this.appRef.current);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <>
                        <PersonOppslagHandler />
                        <AppWrapper ref={this.appRef}>
                            <Decorator />
                            <Content>
                                <Routing />
                            </Content>
                        </AppWrapper>
                    </>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
