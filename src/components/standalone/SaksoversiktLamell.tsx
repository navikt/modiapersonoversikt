import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import SaksoversiktContainer from '../../app/personside/infotabs/saksoversikt/SaksoversiktContainer';

interface Props {
    fødselsnummer: string;
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

if (mockEnabled === 'true') {
    setupMock();
}

class SaksoversiktLamell extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <SaksoversiktContainer fødselsnummer={this.props.fødselsnummer}/>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default SaksoversiktLamell;