import * as React from 'react';
import styled from 'styled-components';
import { ReactNode } from 'react';
import TittelOgIkon from './IkonOgTittel';
import Element from 'nav-frontend-typografi/lib/element';
import { theme } from '../../../../styles/personOversiktTheme';

export const VisittkortBodyWrapper = styled.section`
  background-color: white;
  border-radius: ${theme.borderRadius.layout};
  padding: ${theme.margin.px20};
  display: flex;
  margin-top: .2rem;
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

export const FormFieldSet = styled.fieldset`
  margin:0;
  padding:0;
  border:0;
`;

interface Props {
    children: ReactNode;
    tittel: string;
    ikon?: JSX.Element;
}

export function VisittkortGruppe(props: Props) {
    const tittel = <Element tag="h3">{props.tittel}</Element>;
    return (
        <section>
            <TittelOgIkon tittel={tittel} ikon={props.ikon}/>
            {props.children}
        </section>
    );
}
