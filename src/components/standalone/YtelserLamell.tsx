import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import { Provider } from 'react-redux';
import { PersonContext } from '../../app/App';
import YtelserContainer from '../../app/personside/infotabs/ytelser/YtelserContainer';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';

interface Props {
    fødselsnummer: string;
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

if (mockEnabled) {
    setupMock();
}

const Style = styled.div`
  background-color: ${theme.color.bakgrunn};
  padding: 1rem;
`;

class YtelserLamell extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary>
                <PersonContext.Provider value={this.props.fødselsnummer}>
                    <Provider store={store}>
                        <Style>
                            <YtelserContainer fødselsnummer={this.props.fødselsnummer}/>
                        </Style>
                    </Provider>
                </PersonContext.Provider>
            </ErrorBoundary>
        );
    }
}

export default YtelserLamell;
