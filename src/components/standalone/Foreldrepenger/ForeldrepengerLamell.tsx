import * as React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../../ErrorBoundary';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../../api/config';
import { setupMock } from '../../../mock/setup-mock';
import ForeldrepengerLaster from './ForeldrepengerLaster';

interface Props {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

if (mockEnabled) {
    setupMock();
}

class ForeldrepengerLamell extends React.PureComponent<Props> {

    render() {
        return (
            <ErrorBoundary boundaryName="ForeldrepengeLamell">
                <Provider store={store}>
                    <ForeldrepengerLaster
                        fødselsnummer={this.props.fødselsnummer}

                    />
                </Provider>
            </ErrorBoundary>);
    }
}

export default ForeldrepengerLamell;