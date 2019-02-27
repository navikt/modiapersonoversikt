import * as React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../../ErrorBoundary';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../../api/config';
import { setupMock } from '../../../mock/setup-mock';
import PleiepengerLaster from './PleiepengerLaster';

interface Props {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (mockEnabled) {
    setupMock();
}

class PleiepengerLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="PleiepengeLamell">
                <Provider store={store}>
                    <PleiepengerLaster
                        fødselsnummer={this.props.fødselsnummer}
                        barnetsFødselsnummer={this.props.barnetsFødselsnummer}
                    />
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default PleiepengerLamell;
