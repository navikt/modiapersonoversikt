import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../../redux/reducers';
import thunkMiddleware from 'redux-thunk';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import { Provider } from 'react-redux';
import SaksoversiktContainer from '../../app/personside/infotabs/saksoversikt/SaksoversiktContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import FetchFeatureToggles from '../../app/PersonOppslagHandler/FetchFeatureToggles';
import LyttPåNyttFnrIReduxOgHentPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentPersoninfo';
import { MemoryRouter, Route } from 'react-router';
import { useInfotabsDyplenker } from '../../app/personside/infotabs/dyplenker';

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
    display: flex;
    flex-direction: column;
    height: 100%;
`;

function Routing() {
    const dyplenker = useInfotabsDyplenker();
    return (
        <MemoryRouter>
            <Route path={[dyplenker.saker.route, '/']} component={SaksoversiktContainer} />
        </MemoryRouter>
    );
}

function SaksoversiktLamell(props: Props) {
    return (
        <Provider store={store}>
            <Styles>
                <SetFnrIRedux fødselsnummer={props.fødselsnummer} />
                <LyttPåNyttFnrIReduxOgHentPersoninfo />
                <FetchFeatureToggles />
                <Routing />
            </Styles>
        </Provider>
    );
}

export default SaksoversiktLamell;
