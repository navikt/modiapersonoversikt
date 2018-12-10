import * as React from 'react';
import { Pleiepengerettighet } from '../../../../../models/ytelse/pleiepenger';
import styled from 'styled-components';
import EtikettGrå from '../../../../../components/EtikettGrå';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../../components/common-styled-components';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    pleiepenger: Pleiepengerettighet;
}

const Wrapper = styled.div`
  margin-top: 2rem;
  > *:not(:last-child) {
    margin-top: .3rem;
  }
`;

const Top = styled.div`
  display: flex;
  > *:first-child {
    flex-grow: 1;
  }
`;

const LoadingBar = styled.div<{progress0_100: number}>`
  position: relative;
  width: 100%;
  background-color: ${theme.color.bakgrunn};
  height: 1.5rem;
  &::after {
  content: '';
    position: absolute;
    height: 100%;
    width: ${props => props.progress0_100}%;
    background-color: #38a161;
  }
`;

function FrobrukteDager(props: Props) {
    return (
        <Wrapper>
            <Top>
                <EtikettGrå tag="h3">Barnets dagkonto</EtikettGrå>
                <Normaltekst><Bold>1300 dager</Bold></Normaltekst>
            </Top>
            <LoadingBar progress0_100={10}/>
            <Normaltekst><Bold>35 forbrukte dager per i dag</Bold></Normaltekst>
        </Wrapper>
    );
}

export default FrobrukteDager;
