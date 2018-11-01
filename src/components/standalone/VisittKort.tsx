import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { MemoryRouter, Route, Switch } from 'react-router';

import reducers from '../../redux/reducers';
import VisittkortLaster from './VisittKortLaster';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import Brukerprofilside from '../../app/brukerprofil/BrukerprofilSide';
import { paths } from '../../app/routes/routing';
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
                    <MemoryRouter>
                        <Switch>
                            <Route path={`${paths.brukerprofil}/:fodselsnummer/`} component={Brukerprofilside}/>
                            <Route render={() => <VisittkortLaster fødselsnummer={this.props.fødselsnummer}/>}/>
                        </Switch>
                    </MemoryRouter>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default VisittkortStandAlone;