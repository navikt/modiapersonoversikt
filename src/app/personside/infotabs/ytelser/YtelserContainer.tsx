import * as React from 'react';
import ForeldrePengerContainer from './foreldrepenger/ForeldrePengerContainer';
import styled from 'styled-components';
import PleiePengerContainer from './pleiepenger/PleiePengerContainer';
import SykePengerContainer from './sykepenger/SykePengerContainer';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import theme from '../../../../styles/personOversiktTheme';

const Styling = styled.section`
    width: 100%;
    align-self: center;
    > * {
        margin-bottom: 0.5rem;
    }
    ${theme.resetEkspanderbartPanelStyling};
`;

function YtelserContainer() {
    return (
        <Styling>
            <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />
            <ForeldrePengerContainer />
            <PleiePengerContainer />
            <SykePengerContainer />
        </Styling>
    );
}

export default YtelserContainer;
