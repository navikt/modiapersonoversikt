import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import UtbetalingerContainer from '../../app/personside/infotabs/utbetalinger/UtbetalingerContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components/macro';
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

class UtbetalingsLamell extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="Utbetalinger">
                <Provider store={store}>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <UtbetalingerContainer />
                    </Styles>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default UtbetalingsLamell;
