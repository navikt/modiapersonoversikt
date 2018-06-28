import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import TittelOgIkon from './IkonOgTittel';
import Element from 'nav-frontend-typografi/lib/element';

export const VisittkortBodyDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 12px;
  > * {
    flex: 1 1 50%;
  }
`;

export const Kolonne = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 50px;
  margin-right: 50px;
  &:last-child {
    margin-right: 20px;
  }
  > *:not(:last-child) {
    margin-bottom: 40px;
  }
`;

interface Props {
    children: string | JSX.Element | JSX.Element[] | ReactNode;
    tittel: string;
    ikon?: JSX.Element;
}

export function VisittkortGruppe(props: Props) {
    const tittel = <Element tag="h2">{props.tittel}</Element>;
    return (
        <div>
            <TittelOgIkon tittel={tittel} ikon={props.ikon}/>
            {props.children}
        </div>
    );
}
