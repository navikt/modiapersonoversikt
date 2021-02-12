import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import OppfolgingContainer from '../../app/personside/infotabs/oppfolging/OppfolgingContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fnr: string;
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
                    <SetFnrIRedux fnr={this.props.fnr} />
                    <OppfolgingContainer />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default OppfolgingLamell;
