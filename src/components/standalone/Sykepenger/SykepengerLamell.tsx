import * as React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../../ErrorBoundary';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../../api/config';
import { setupMock } from '../../../mock/setup-mock';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import SykePengerContainer from '../../../app/personside/infotabs/ytelser/sykepenger/SykePengerContainer';
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';

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

function SykepengerLamell(props: Props) {
    return (
        <ErrorBoundary boundaryName="SykepengerLamell">
            <Provider store={store}>
                <Styles>
                    <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
                    <SykePengerContainer fødselsnummer={props.fødselsnummer} />
                </Styles>
            </Provider>
        </ErrorBoundary>
    );
}

export default SykepengerLamell;
