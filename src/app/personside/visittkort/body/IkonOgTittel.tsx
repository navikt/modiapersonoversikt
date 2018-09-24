import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import theme from '../../../../styles/personOversiktTheme';

const TittelOgIkonDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IkonDiv = styled.div`
  position: absolute;
  left: -${theme.margin.px50};
  width: ${theme.margin.px50};
  display: flex;
  justify-content: center;
  > svg {
    height: 1.5rem;
    width: auto;
  }
`;

interface Props {
    ikon?: JSX.Element;
    tittel: ReactNode;
}

function TittelOgIkon(props: Props) {
    const ikon = props.ikon ? <IkonDiv>{props.ikon}</IkonDiv> : '';
    return (
        <TittelOgIkonDiv>
            {ikon}{props.tittel}
        </TittelOgIkonDiv>
    );
}

export default TittelOgIkon;
