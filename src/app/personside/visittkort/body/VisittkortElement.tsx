import * as React from 'react';
import styled from 'styled-components';

import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import Element from 'nav-frontend-typografi/lib/element';

interface ElementProps {
    children: string | JSX.Element | JSX.Element[];
    beskrivelse?: string;
    type?: 'header' | 'subheader';
    ikon?: JSX.Element;
}

const ElementStyle = styled.div`
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

export const TittelStyle = styled.span`
  opacity: 0.7;
`;

function Tittel(props: {type?: string, children: string}) {
    if (props.type === 'header') {
        return <Element>{props.children}</Element>;
    } else {
        return <EtikettLiten><TittelStyle>{props.children}</TittelStyle></EtikettLiten>;
    }
}

function VisittkortElement(props: ElementProps) {
    const ikon = props.ikon || '';
    const tittelTekst = props.beskrivelse ? props.beskrivelse : '';

    return (
        <ElementStyle>
            <IkonDiv>
                {ikon}
            </IkonDiv>
            <InfoDiv>
                <Tittel type={props.type}>{tittelTekst}</Tittel>
                {props.children}
            </InfoDiv>
        </ElementStyle>
    );
}

export default VisittkortElement;
