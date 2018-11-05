import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import UtbetalingerContainer from '../../app/personside/infotabs/utbetalinger/UtbetalingerContainer';
import { PersonContext } from '../../app/App';

interface Props {
    fødselsnummer: string;
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

if (mockEnabled) {
    setupMock();
}

class UtbetalingsLamell extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary>
                <PersonContext.Provider value={this.props.fødselsnummer}>
                    <Provider store={store}>
                        <UtbetalingerContainer fødselsnummer={this.props.fødselsnummer}/>
                    </Provider>
                </PersonContext.Provider>
            </ErrorBoundary>
        );
    }
}

export default UtbetalingsLamell;