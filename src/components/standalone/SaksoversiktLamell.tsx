import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import SaksoversiktContainer from '../../app/personside/infotabs/saksoversikt/SaksoversiktContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import FetchFeatureToggles from '../../app/PersonOppslagHandler/FetchFeatureToggles';
import LyttPåNyttFnrIReduxOgHentPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentPersoninfo';

interface Props {
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
    overflow-y: auto;
`;

class SaksoversiktLamell extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="Saksoversikt">
                <Provider store={store}>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <LyttPåNyttFnrIReduxOgHentPersoninfo />
                        <FetchFeatureToggles />
                        <SaksoversiktContainer fødselsnummer={this.props.fødselsnummer} />
                    </Styles>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default SaksoversiktLamell;
