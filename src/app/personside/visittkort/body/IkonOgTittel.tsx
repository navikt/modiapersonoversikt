import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';

const TittelOgIkonDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IkonDiv = styled.div`
  position: absolute;
  left: -50px;
  width: 50px;
  display: flex;
  justify-content: center;
  > svg {
    height: 24px;
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
            {ikon}
            {props.tittel}
        </TittelOgIkonDiv>
    );
}

export default TittelOgIkon;
