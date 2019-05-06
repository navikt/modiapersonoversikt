import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../../redux/reducers';
import VisittkortLaster from './VisittKortLaster';
import { mockEnabled } from '../../api/config';
import { setupMock } from '../../mock/setup-mock';
import ErrorBoundary from '../ErrorBoundary';
import Kontrollsporsmal from '../../app/personside/kontrollsporsmal/Kontrollsporsmal';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import theme from '../../styles/personOversiktTheme';
import styled from 'styled-components';
import TilbakemeldingFab from './Tilbakemelding/TilbakemeldingFab';
import { FeatureToggles } from '../featureToggle/toggleIDs';
import IfFeatureToggleOn from '../featureToggle/IfFeatureToggleOn';

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

const temaId = 'hurtigreferat';
const sporsmal = 'Her kan vi skrive spørsmålet... lorem ipsum etc, bare for å få litt tekst her';

class VisittkortStandAlone extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary>
                <Provider store={store}>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                        <Kontrollsporsmal />
                        <VisittkortLaster fødselsnummer={this.props.fødselsnummer} />

                        <IfFeatureToggleOn toggleID={FeatureToggles.VisTilbakemelding}>
                            <TilbakemeldingFab temaId={temaId} sporsmal={sporsmal} />
                        </IfFeatureToggleOn>
                    </Styles>
                </Provider>
            </ErrorBoundary>
        );
    }
}

export default VisittkortStandAlone;
