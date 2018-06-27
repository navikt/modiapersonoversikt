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
  flex: 0 0 auto;
  margin-right: 50px;
`;

const TittelOgIkon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const TittelDiv = styled.div`
  margin-left: 50px;
`;

const IkonDiv = styled.div`
  position: absolute;
  width: 50px;
  display: flex;
  justify-content: center;
  > svg {
    height: 24px;
    width: auto;
  }
`;

const InfoDiv = styled.div`
  text-align: left;
  margin-left: 50px;
`;

export const TittelStyle = styled.span`
  opacity: 0.7;
`;

function Tittel(props: { type?: string, children: string }) {
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
            <TittelOgIkon>
                <IkonDiv>
                    {ikon}
                </IkonDiv>
                <TittelDiv>
                    <Tittel type={props.type}>
                        {tittelTekst}
                    </Tittel>
                </TittelDiv>
            </TittelOgIkon>
            <InfoDiv>
                {props.children}
            </InfoDiv>
        </ElementStyle>
    );
}

export default VisittkortElement;
