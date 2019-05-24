import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../../api/config';
import { setupMock } from '../../../mock/setup-mock';
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';
import ErrorBoundary from '../../ErrorBoundary';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import HurtigreferatContainer from '../../../app/personside/dialogpanel/Hurtigreferat/HurtigreferatContainer';
import TriggerCallback from './TriggerCallback';

interface Props {
    meldingBleSendtCallback: () => void;
    fødselsnummer: string;
}

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (mockEnabled) {
    setupMock();
}

const Styles = styled.div`
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    ${theme.resetEkspanderbartPanelStyling}
`;

function HurtigreferatStandalone(props: Props) {
    return (
        <ErrorBoundary boundaryName="Hurtigreferat-standalone">
            <Provider store={store}>
                <Styles>
                    <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
                    <TriggerCallback callBack={props.meldingBleSendtCallback} />
                    <HurtigreferatContainer />
                </Styles>
            </Provider>
        </ErrorBoundary>
    );
}

export default HurtigreferatStandalone;
