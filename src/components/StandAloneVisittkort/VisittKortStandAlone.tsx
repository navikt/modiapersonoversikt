import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { personOversiktTheme } from '../../themes/personOversiktTheme';
import reducers from '../../../src/redux/reducer';
import { hentAllPersonData } from '../../redux/personinformasjon';
import StandAloneVisittKortContainer from './VisittKortLaster';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';

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
                    <StandAloneVisittKortContainer />
                </ThemeProvider>
            </Provider>
        );
    }
}

export default VisittkortStandAlone;