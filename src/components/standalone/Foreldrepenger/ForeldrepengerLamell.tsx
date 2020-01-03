import * as React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../../ErrorBoundary';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../../api/config';
import { setupMock } from '../../../mock/setup-mock';
import ForeldrepengerLaster from './ForeldrepengerLaster';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fødselsnummer: string;
}
const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

if (mockEnabled) {
    setupMock();
}

class ForeldrepengerLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="ForeldrepengeLamell">
                <Provider store={store}>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <ForeldrepengerLaster fødselsnummer={this.props.fødselsnummer} />
                    </Styles>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default ForeldrepengerLamell;
