import * as React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import UtbetalingerContainer from '../../app/personside/infotabs/utbetalinger/UtbetalingerContainer';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { MemoryRouter } from 'react-router';

interface Props {
    fødselsnummer: string;
}

const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

class UtbetalingsLamell extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary boundaryName="Utbetalinger">
                <MemoryRouter>
                    <Styles>
                        <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                        <UtbetalingerContainer />
                    </Styles>
                </MemoryRouter>
            </ErrorBoundary>
        );
    }
}

export default UtbetalingsLamell;
