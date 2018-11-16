import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../../redux/reducers';
import VisittkortLaster from './VisittKortLaster';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';

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

class VisittkortStandAlone extends React.Component<Props> {

    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <VisittkortLaster fødselsnummer={this.props.fødselsnummer}/>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default VisittkortStandAlone;