import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import OppfolgingContainer from '../../app/personside/infotabs/oppfolging/OppfolgingContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fødselsnummer: string;
}

const Styles = styled.div`
    .visually-hidden {
        ${theme.visuallyHidden}
    }
    overflow-y: auto;
    ${theme.resetEkspanderbartPanelStyling}
`;

class OppfolgingLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName={'Oppfølging'}>
                <Styles>
                    <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                    <OppfolgingContainer />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default OppfolgingLamell;
