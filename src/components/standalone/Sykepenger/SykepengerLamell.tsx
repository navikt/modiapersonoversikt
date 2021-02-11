import * as React from 'react';
import ErrorBoundary from '../../ErrorBoundary';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import SetFnrIRedux from '../../../app/PersonOppslagHandler/SetFnrIRedux';
import SykePengerLaster from './SykepengerLaster';

interface Props {
    fnr: string;
    sykmeldtFraOgMed: string;
}

const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

function SykepengerLamell(props: Props) {
    return (
        <ErrorBoundary boundaryName="SykepengerLamell">
            <Styles>
                <SetFnrIRedux fnr={props.fnr} />
                <SykePengerLaster fnr={props.fnr} sykmeldtFraOgMed={props.sykmeldtFraOgMed} />
            </Styles>
        </ErrorBoundary>
    );
}

export default SykepengerLamell;
