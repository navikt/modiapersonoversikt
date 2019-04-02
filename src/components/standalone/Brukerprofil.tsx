import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../../redux/reducers';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import BrukerprofilSide from '../../app/brukerprofil/BrukerprofilSide';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';

interface Props {
    fødselsnummer: string;
}

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (mockEnabled) {
    setupMock();
}

const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

class BrukerprofilStandalone extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="Brukerprofil">
                <Provider store={store}>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                        <BrukerprofilSide />
                    </Styles>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default BrukerprofilStandalone;
