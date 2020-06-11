import * as React from 'react';
import ErrorBoundary from '../../ErrorBoundary';
import PleiepengerLaster from './PleiepengerLaster';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fødselsnummer: string;
    barnetsFødselsnummer: string;
}

const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

class PleiepengerLamell extends React.PureComponent<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="PleiepengeLamell">
                <Styles>
                    <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                    <PleiepengerLaster
                        fødselsnummer={this.props.fødselsnummer}
                        barnetsFødselsnummer={this.props.barnetsFødselsnummer}
                    />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default PleiepengerLamell;
