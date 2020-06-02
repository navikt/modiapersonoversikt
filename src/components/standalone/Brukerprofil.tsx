import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import BrukerprofilSide from '../../app/brukerprofil/BrukerprofilSide';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import FetchSessionInfoOgLeggIRedux from '../../app/FetchSessionInfoOgLeggIRedux';

interface Props {
    fødselsnummer: string;
}

const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

class BrukerprofilStandalone extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="Brukerprofil">
                <Styles>
                    <FetchSessionInfoOgLeggIRedux />
                    <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                    <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                    <BrukerprofilSide />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default BrukerprofilStandalone;
