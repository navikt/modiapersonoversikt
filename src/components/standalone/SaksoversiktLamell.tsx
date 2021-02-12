import * as React from 'react';
import SaksoversiktContainer from '../../app/personside/infotabs/saksoversikt/SaksoversiktContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import FetchFeatureToggles from '../../app/PersonOppslagHandler/FetchFeatureToggles';
import LyttPåNyttFnrIReduxOgHentPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentPersoninfo';
import { MemoryRouter, Route } from 'react-router';
import { useInfotabsDyplenker } from '../../app/personside/infotabs/dyplenker';
import ErrorBoundary from '../ErrorBoundary';

interface Props {
    fnr: string;
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
    return <Route path={[dyplenker.saker.route, '/']} component={SaksoversiktContainer} />;
}

function SaksoversiktLamell(props: Props) {
    return (
        <ErrorBoundary boundaryName="SaksoversiktLamell">
            <MemoryRouter>
                <Styles>
                    <SetFnrIRedux fnr={props.fnr} />
                    <LyttPåNyttFnrIReduxOgHentPersoninfo />
                    <FetchFeatureToggles />
                    <Routing />
                </Styles>
            </MemoryRouter>
        </ErrorBoundary>
    );
}

export default SaksoversiktLamell;
