import * as React from 'react';
import styled from 'styled-components';
import { EtikettLiten } from 'nav-frontend-typografi';

interface ElementProps {
    children: string | JSX.Element | JSX.Element[];
    beskrivelse?: string;
    ikon?: JSX.Element;
}

const Element = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin-right: 50px;
`;

const IkonDiv = styled.div`
  flex: 0 0 50px;
  text-align: center;
  > svg {
    height: 25px;
    width: auto;
  }
`;

const InfoDiv = styled.div`
  flex: 1 1;
  text-align: left;
`;

const Tittel = styled.span`
  opacity: 0.7;
`;

function VisittkortElement(props: ElementProps) {
    const ikon = props.ikon || '';
    const tittel = props.beskrivelse
        ? <EtikettLiten><Tittel>{props.beskrivelse}</Tittel></EtikettLiten>
        : '';

    return (
        <Element>
            <IkonDiv>
                {ikon}
            </IkonDiv>
            <InfoDiv>
                {tittel}
                {props.children}
            </InfoDiv>
        </Element>
    );
}

export default VisittkortElement;
