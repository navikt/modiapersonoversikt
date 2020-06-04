import * as React from 'react';
import ErrorBoundary from '../../ErrorBoundary';
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

class ForeldrepengerLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="ForeldrepengeLamell">
                <Styles>
                    <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                    <ForeldrepengerLaster fødselsnummer={this.props.fødselsnummer} />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default ForeldrepengerLamell;
