import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import Routing from './routes/routing';
import UnderArbeid from '../components/underarbeid/UnderArbeid';
import { setupMock } from '../mock/setup-mock';
import reducers from '../redux/reducers';
import { mockEnabled } from '../api/config';
import AppWrapper, { Content } from './AppWrapper';
import Eventlistener from './Eventlistener';
import ModalWrapper from 'nav-frontend-modal';
import { Person, PersonRespons } from '../models/person/person';
import { isLoaded, Loaded } from '../redux/restReducers/restReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ToolTipContainer from '../components/tooltip/ToolTipContainer';

if (mockEnabled) {
    setupMock();
}

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export const PersonContext = React.createContext<string | undefined>(undefined);

class App extends React.Component<{}> {

    private appRef = React.createRef<HTMLDivElement>();

    constructor(props: {}) {
        super(props);

        store.subscribe(() => this.forceUpdate());
    }

    componentDidMount() {
        if (this.appRef.current) {
            ModalWrapper.setAppElement(this.appRef.current);
        }
    }

    render() {
        return (
            <PersonContext.Provider
                value={
                    isLoaded((store.getState().restEndepunkter.personinformasjon))
                    ?
                    ((store.getState()
                        .restEndepunkter.personinformasjon as Loaded<PersonRespons>)
                        .data as Person)
                        .fødselsnummer || undefined
                    :
                    undefined
                }
            >
                <Provider store={store}>
                    <AppWrapper ref={this.appRef}>
                        <nav id="header"/>
                        <BrowserRouter>
                            <Content>
                                <Eventlistener/>
                                <Routing/>
                            </Content>
                        </BrowserRouter>
                        <UnderArbeid/>
                        <ToolTipContainer/>
                    </AppWrapper>
                </Provider>
            </PersonContext.Provider>
        );
    }
}

export default App;
