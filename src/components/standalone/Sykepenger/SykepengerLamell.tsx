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
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';
import SykePengerLaster from './SykepengerLaster';

interface Props {
    fødselsnummer: string;
    sykmeldtFraOgMed: string;
}

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (mockEnabled) {
    setupMock();
}

const Styles = styled.div`
    overflow-y: auto;
    background-color: white;
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
                    <SykePengerLaster fødselsnummer={props.fødselsnummer} sykmeldtFraOgMed={props.sykmeldtFraOgMed} />
                </Styles>
            </Provider>
        </ErrorBoundary>
    );
}

export default SykepengerLamell;
