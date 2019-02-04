import * as React from 'react';
import ForeldrePengerContainer from './foreldrepenger/ForeldrePengerContainer';
import styled from 'styled-components';
import PleiePengerContainer from './pleiepenger/PleiePengerContainer';
import SykePengerContainer from './sykepenger/SykePengerContainer';
import { pxToRem } from '../../../../styles/personOversiktTheme';

interface Props {
    fødselsnummer: string;
}

const Styling = styled.section`
  max-width: ${pxToRem(900)};
  width: 100%;
  align-self: center;
  > * {
    margin-bottom: .5rem;
  }
`;

function YtelserContainer({fødselsnummer}: Props) {
    return (
        <Styling>
            <ForeldrePengerContainer fødselsnummer={fødselsnummer}/>
            <PleiePengerContainer fødselsnummer={fødselsnummer}/>
            <SykePengerContainer fødselsnummer={fødselsnummer}/>
        </Styling>
    );
}

export default YtelserContainer;
