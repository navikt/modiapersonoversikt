import * as React from 'react';
import ForeldrePengerContainer from './foreldrepenger/ForeldrePengerContainer';
import styled from 'styled-components/macro';
import PleiePengerContainer from './pleiepenger/PleiePengerContainer';
import SykePengerContainer from './sykepenger/SykePengerContainer';
import theme from '../../../../styles/personOversiktTheme';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';

interface Props {
    fødselsnummer: string;
}

const Styling = styled.section`
    max-width: ${theme.width.ytelser};
    width: 100%;
    align-self: center;
    > * {
        margin-bottom: 0.5rem;
    }
`;

function YtelserContainer({ fødselsnummer }: Props) {
    return (
        <Styling>
            <VisuallyHiddenAutoFokusHeader tittel="Ytelser" />
            <ForeldrePengerContainer fødselsnummer={fødselsnummer} />
            <PleiePengerContainer fødselsnummer={fødselsnummer} />
            <SykePengerContainer fødselsnummer={fødselsnummer} />
        </Styling>
    );
}

export default YtelserContainer;
