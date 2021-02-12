import * as React from 'react';
import ErrorBoundary from '../../ErrorBoundary';
import PleiepengerLaster from './PleiepengerLaster';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';

interface Props {
    fnr: string;
    barnetsFnr: string;
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
                    <SetFnrIRedux fnr={this.props.fnr} />
                    <PleiepengerLaster fødselsnummer={this.props.fnr} barnetsFødselsnummer={this.props.barnetsFnr} />
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default PleiepengerLamell;
