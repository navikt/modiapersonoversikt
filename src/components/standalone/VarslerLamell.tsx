import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import theme from '../../styles/personOversiktTheme';
import thunkMiddleware from 'redux-thunk';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import VarslerContainer from '../../app/personside/infotabs/varsel/VarslerContainer';
import reducers from '../../redux/reducers';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import styled from 'styled-components';

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
    ${theme.resetEkspanderbartPanelStyling}
`;

class VarslerLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName={'Oppfølging'}>
                <Provider store={store}>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <VarslerContainer />
                    </Styles>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default VarslerLamell;
