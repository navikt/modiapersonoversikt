import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import PersonsokKomponent from '../../app/personsok/PersonsokKomponent';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (mockEnabled) {
    setupMock();
}

class PersonsokStandAloneKomponent extends React.PureComponent {
    render() {
        return (
            <ErrorBoundary boundaryName="Personsøk">
                <Provider store={store}>
                    <PersonsokKomponent />
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default PersonsokStandAloneKomponent;
