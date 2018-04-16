import * as React from 'react';
import styled from 'styled-components';
import Element from 'nav-frontend-typografi/lib/element';

export const VisittkortBodyDiv = styled.div`
  display: flex;
  > * {
    flex-grow: 1;
  }
`;

export const Kolonne = styled.div`
  > *:not(:last-child) {
    margin-bottom: 60px;
  }
`;

const GruppeDiv = styled.div`
  > *:not(:last-child):not(:first-child) {
    margin-bottom: 30px;
  }
  > *:first-child{
    margin-bottom: 10px;
  }
`;

const PadLeft = styled.span`
  margin-left: 50px;
`;

export function InfoGruppe(props: { children: string | JSX.Element | JSX.Element[]; tittel: string; }) {
    return (
        <GruppeDiv>
            <Element>
                <PadLeft>{props.tittel}</PadLeft>
            </Element>
            {props.children}
        </GruppeDiv>
    );
}
