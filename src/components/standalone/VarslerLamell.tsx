import * as React from 'react';
import theme from '../../styles/personOversiktTheme';
import ErrorBoundary from '../ErrorBoundary';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import VarslerContainer from '../../app/personside/infotabs/varsel/VarslerContainer';
import styled from 'styled-components/macro';

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

class VarslerLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName={'Oppfølging'}>
                <Styles>
                    <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                    <VarslerContainer />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default VarslerLamell;
