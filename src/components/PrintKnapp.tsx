import * as React from 'react';
import styled from 'styled-components';
import Printer from '../svg/Printer';
import theme from '../styles/personOversiktTheme';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {
    onClick: (event: React.MouseEvent) => void;
}

const PrintIkonStyle = styled.button`
  border: none;
  background-color: transparent;
  padding: .1rem .2rem;
  border-radius: ${theme.borderRadius.knapp};;
  cursor: pointer;
  display: flex;
  color: ${theme.color.lenke};
  svg {
    margin-left: .5rem;
    height: 1.2rem;
    width: 1.2rem;
  }
  &:focus {
    ${theme.focus}
  }
  &:hover {
    opacity: 0.8;
  }
`;

function PrintKnapp({onClick}: Props) {
    return (
        <PrintIkonStyle onClick={onClick} aria-label="Skriv ut">
            <Normaltekst tag="span">Skriv ut</Normaltekst> <Printer/>
        </PrintIkonStyle>
    );
}

export default PrintKnapp;
