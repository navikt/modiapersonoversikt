import * as React from 'react';
import styled from 'styled-components';
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
  > *:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const GruppeDiv = styled.div`
  > *:not(:last-child):not(:first-child) {
    margin-bottom: 20px;
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
