import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { MemoryRouter, Route, Switch } from 'react-router';

import { personOversiktTheme } from '../../themes/personOversiktTheme';
import reducers from '../../../src/redux/reducer';
import { hentAllPersonData } from '../../redux/personinformasjon';
import StandAloneVisittKortContainer from './VisittKortLaster';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import Brukerprofilside from '../../app/brukerprofil/BrukerprofilSide';
import { paths } from '../../app/routes/routing';

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

class VisittkortStandAlone extends React.Component<Props> {

    componentWillMount() {
        hentAllPersonData(store.dispatch, this.props.fødselsnummer);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={personOversiktTheme}>
                    <MemoryRouter>
                        <Switch>
                            <Route path={`${paths.brukerprofil}/:fodselsnummer/`} component={Brukerprofilside}/>
                            <Route component={StandAloneVisittKortContainer}/>
                        </Switch>
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default VisittkortStandAlone;