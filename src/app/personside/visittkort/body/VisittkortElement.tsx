import * as React from 'react';
import styled from 'styled-components';
import TittelOgIkon from './IkonOgTittel';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { ReactNode } from 'react';

interface ElementProps {
    children: ReactNode;
    beskrivelse?: string;
    ikon?: JSX.Element;
}

const VisittkortElementStyle = styled.div`
  flex: 0 0 auto;
  margin: 10px 0 20px 0;
  &:last-child {
    margin: 10px 0 0 0;
  }
`;

export const TittelStyle = styled.span`
  opacity: 0.7;
`;

function VisittkortElement(props: ElementProps) {
    const tittel = <EtikettLiten tag="h3"><TittelStyle>{props.beskrivelse}</TittelStyle></EtikettLiten>;
    return (
        <VisittkortElementStyle>
            <TittelOgIkon tittel={tittel} ikon={props.ikon}/>
            {props.children}
        </VisittkortElementStyle>
    );
}

export default VisittkortElement;
