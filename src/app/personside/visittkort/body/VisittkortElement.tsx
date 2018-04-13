import * as React from 'react';
import styled from 'styled-components';
import { EtikettLiten } from 'nav-frontend-typografi';

interface ElementProps {
    children: string | JSX.Element | JSX.Element[];
    beskrivelse?: string;
    ikonPath?: string;
}

const Element = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin-right: 50px;
`;

const IkonDiv = styled.div`
  flex: 0 0 50px;
  text-align: center;
  > img {
    height: 25px;
    opacity: 0.5;
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
    const img = props.ikonPath ? <img src={props.ikonPath} alt={props.beskrivelse} /> : '';
    const tittel = props.beskrivelse
        ? <EtikettLiten><Tittel>{props.beskrivelse}</Tittel></EtikettLiten>
        : '';

    return (
        <Element>
            <IkonDiv>
                {img}
            </IkonDiv>
            <InfoDiv>
                {tittel}
                {props.children}
            </InfoDiv>
        </Element>
    );
}

export default VisittkortElement;
